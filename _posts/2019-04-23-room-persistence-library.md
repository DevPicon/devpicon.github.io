---
published: false
---
![](https://cdn-images-1.medium.com/max/2600/1*rZBIQ1AH1ufDTn8KldAyHA.png)

# [Actualizado] Room — Un Vistazo a los ‘Android Architecture Components’

No hace mucho, durante el último Google I/O hicieron el anuncio sobre el
desarrollo de los *Architecture Components*, un conjunto de bibliotecas que
formarían parte de la propuesta del equipo de Android para establecer una
arquitectura recomendada para los nuevos desarrollos en Android.

> **Update al 23 de abril del 2019: He actualizado el repositorio y los ejemplos a
> las últimas versiones de Room y en general a AndroidX.**

Los llamados *Architecture Components* están conformados por las siguientes
bibliotecas o componentes:

* Room
* LiveData
* Handling Lifecycle
* ViewModel

Hoy en día muchas de las dependencias ya se encuentran en versiones estables.
Por ahora le daremos un repaso al primer componente **Room**.

### **Room: a SQL object mapping library**

Durante mucho tiempo veníamos creando uno conjunto de clases para determinar la
estructura de nuestras tablas, las sentencias y operaciones CRUD. Ahora, esos
tiempo de ¿sufrimiento? se han terminado.

Aunque la documentación es algo sencilla de entender, de todos modos les dejo
los pasos que seguí para empezar a probar este recurso, en Kotlin en este caso
porque la red está invadida de ejemplos escritos con Java.

#### Agregar las dependencias

Tan solo se requiere agregar las dependencias necesarias:

    implementation "androidx.room:room-runtime:2.0.0"
    kapt "androidx.room:room-compiler:2.0.0"
    testImplementation "androidx.room:room-testing:2.0.0"
    implementation "androidx.room:room-rxjava2:2.0.0"
    compile 'io.reactivex.rxjava2:rxkotlin:2.1.0'
    compile 'io.reactivex.rxjava2:rxandroid:2.0.1'

#### Crear POJOS para definir las Entidades

Crear los POJOs agregándole ciertas anotaciones propias de Room. En el ejemplo a
continuación estamos definiendo una clase que guardará la información de
nuestras tareas, mediante la anotación **@Entity** Room identificará que dicho
POJO es la representación de una entidad en particular, mientras que la
anotación **@PrimaryKey** será la encargada de decirle qué atributo será el que
tome el rol de llave primaria de nuestra entidad.

    import androidx.room.Entity
    import androidx.room.PrimaryKey
    data class Task(
    (autoGenerate = true) val id : Long, val description : String)

Existe la posibilidad de definir llaves primarias compuestas, todas esas
particularidades las podrán encontrar directamente en [la documentación en la
sección
Entities](https://developer.android.com/topic/libraries/architecture/room.html#entities).

#### Definir los DAOs

Luego de ello debemos definir la interfaz de nuestro [DAO (Data Access
Object)](https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm)
de una forma similar a como aparece a continuación. Esta interfaz deberá llevar
en principio la anotación **@Dao** para que Room la reconozca y luego por cada
operación que precisemos definir usaremos la anotación
[@Query](https://developer.android.com/reference/android/arch/persistence/room/Query.html)
para nuestras funciones de consulta **@Insert**, **@Delete** y **@Update** para
el resto de operaciones.

    import androidx.room.*
    import io.reactivex.Flowable
    interface TaskDao {
        
        fun getAllTasks(): Flowable<List<Task>>
        
        fun getTask(description: String): Task

        
        fun insertTask(task: Task)
        
        fun updateTask(tasks: Array<Task>)
        
        fun deleteTask(tasks: Array<Task>)
    }

Aunque esta representación es algo simple, es posible elaborar algunas más
complejas incluyendo el envío de parámetros a las consultas. Estas
particularidades las podremos encontrar también en [la documentación en la
sección
DAO](https://developer.android.com/topic/libraries/architecture/room.html#daos).

#### Declarar la base de datos

Finalmente, necesitamos efectuar la declaración de la base de datos; para que se
le reconozca como una base de datos que emplea Room.

    import androidx.room.Database
    import androidx.room.RoomDatabase
    abstract class AppDatabase : RoomDatabase() {
        abstract fun taskDao() : TaskDao
    }

Para poder acceder al objeto de la base de datos defino una clase *custom
application* de una forma similar a como lo hago a continuación:

    import android.app.Application
    import androidx.room.Room
    import com.devpicon.android.myarchcomponentssampleapplication.AppDatabase
    class MyApplication : Application() {
        companion object {
            lateinit var database : AppDatabase
        }
        override fun onCreate() {
            super.onCreate()
            
        }
    }

#### ¿Cómo testear los DAOs?

Creamos la clase que albergará nuestros tests. Por medio de la función
*inMemoryDatabaseBuilder* podremos generar una instancia de nuestra base de
datos que se destruirá una vez que el proceso muera.

Gracias a [Florina Muntenescu](https://medium.com/u/d5885adb1ddf) supe que,
adicionalmente, había que agregar la invocación a la función
`allowMainThreadQueries`, para que la ejecución de nuestras consultas en el hilo
principal. Les dejo [el enlace de su
post](https://medium.com/google-developers/room-rxjava-acb0cd4f3757) en la
sección de Referencias.

> **Update al 23 de abril del 2019: Inicialmente el artículo hacía referencia a la
> necesidad de agregar una instancia de **`InstantTaskExecutorRule`**. para
asegurarnos que las tareas se ejecuten instantáneamente, pero luego de la
migración no le he visto mayor utilidad.**

A continuación, les dejaré un ejemplo de cómo escribir el *test* para el DAO que
hemos escrito, el test consistirá en insertar y obtener un elemento a través de
las operaciones definidas en nuestro DAO:

    @RunWith(AndroidJUnit4::class)
    class TaskDaoTest {
        private lateinit var database: AppDatabase
        private val DESCRIPTION = "Tarea 1"
        @Before
        fun initDb() {
            val context = ApplicationProvider.getApplicationContext<Context>()
            database = Room.inMemoryDatabaseBuilder(context,
                    AppDatabase::class.
    )
                    .allowMainThreadQueries()
                    .build()
        }
        @Test
        fun insertAndGetTask() {
            // Insert
            database.taskDao().insertTask(Task(0, DESCRIPTION))
            // Query an specific description
            val foundTask: Task = database.taskDao().getTask(DESCRIPTION)
            assertNotNull(foundTask)
            assertEquals(DESCRIPTION, foundTask.description)
            // Query all elements
            val allTasks: Flowable<List<Task>> = database.taskDao().getAllTasks()
            allTasks.subscribe 
    tasks 
    tasks.size
                    assertThat(tasks.size, `is`(1))
                    val task: Task = tasks[0]
                    assertEquals(DESCRIPTION, task.description)
                
    }
        
        @After
        fun closeDb() {
            database.close()
        }
    }

El ejemplo completo se encuentra en github, lo iré actualizando para hacerlo un
poco más útil (por ahora solo inserta y lee valores desde Room).

> **Update al 23 de abril del 2019: He actualizado las dependencias, si desean ver
> las diferencias pueden revisar los commits del repositorio.**

[Room Sample Repository](https://github.com/DevPicon/arch-components-sample-app)

#### Referencias

* Room Persistence Library | Android Developers<br>
[https://developer.android.com/topic/libraries/architecture/room.html](https://developer.android.com/topic/libraries/architecture/room.html)
* Architecture Components | Android Developers<br>
[https://developer.android.com/topic/libraries/architecture/index.html](https://developer.android.com/topic/libraries/architecture/index.html)
* Kotlin<br> [https://kotlinlang.org/](https://kotlinlang.org/)
* Data Access Object | Tutorials Point<br>
[https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm](https://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm)
* Room Class Documentation| Android Developers<br>
[https://developer.android.com/reference/android/arch/persistence/room/Room.html](https://developer.android.com/reference/android/arch/persistence/room/Room.html)
* Room 🔗 RxJava<br>
[https://medium.com/google-developers/room-rxjava-acb0cd4f3757](https://medium.com/google-developers/room-rxjava-acb0cd4f3757)
* InstantTaskExecutorRule<br>
[https://developer.android.com/reference/android/arch/core/executor/testing/InstantTaskExecutorRule.html](https://developer.android.com/reference/android/arch/core/executor/testing/InstantTaskExecutorRule.html)