---
published: false
---
#### 

# Android — Explorando ConstraintLayout (1)

## …el uso de un RelativeLayout con esteroides

![](https://cdn-images-1.medium.com/max/2400/1*g4C79VlwIMzJsfzs6DjVYw.png)

En mi vida como desarrollador Android siempre he sufrido para armar vistas
complejas, layout tras layout… las pantallas y su comportamiento se han ido
tornando complejas a medida que el tiempo va avanzando. Lo típico en un
desarrollador novato es anidar un layout con otro hasta tener un árbol de
elementos por demás poblado y complejo de mantener. Ni que decir sobre el
*performance* de tan solo esta pantalla cuyos números se disparan por las nubes.

Hace un tiempo atrás el equipo de Android liberó **ConstraintLayout**, un
componente que permite construir vistas complejas sin caer en la pesadilla de
anidar muchas vistas una dentro de otra. Este componente es compatible con
aplicaciones que estén con un mínimo de soporte hasta Android 2.3 (API 9),
adicionalmente, forma parte de [Android
Jetpack](https://developer.android.com/jetpack/), un conjunto de componentes
cuyo uso forma parte de las buenas prácticas para el desarrollo de aplicaciones
Android.

Este esta publicación empezaremos por reconocer los elementos básicos que forman
parte del uso de este componente.

#### ¿ConstraintLayout? ¿Constraint?

Para definir lo que es un *Constraint* tomaré la definición que se encuentra en
la [documentación](https://developer.android.com/training/constraint-layout/)
provista por el equipo de Android:

> Cada constraint representa una conexión o alineamiento a otra vista, al layout
> padre, o a una guía invisible. Cada constraint define la posición de la vista en
función a los ejes vertical u horizontal; por ello cada vista debe contar con al
menos un constraint por cada eje, aunque a menudo será necesario definir más de
uno.

Entonces, debemos tomar los *constraints* como puntos de anclaje, como
conexiones que tienen un origen y un destino.

#### ¿Un RelativeLayout con esteroides?

Cuando hablamos de armar vistas, un buen número de desarrolladores y
particularmente los novatos, viven haciéndolo mediante el uso de LinearLayouts.
Quizá porque el uso de los RelativeLayouts es algo que para una buena parte de
los desarrolladores no tiene mucho sentido, tal vez por las pocas opciones que
traía consigo este componente o tal vez por desconocimiento. Sin embargo, una
vez que comenzamos con los **ConstraintLayouts** y luego vemos los
RelativeLayouts en retrospectiva, veremos que podemos hacer muchas más cosas.

#### Positioning Constraints

Vamos a comenzar a explorar las propiedades de ConstraintLayout mediante el
posicionamiento de algunos elementos de una forma sencilla.

![Dos botones situados en la parte inferior derecha de la pantalla](https://cdn-images-1.medium.com/max/1600/1*mJ3apYowWrhh02KJDzikjg.png)

En la imagen anterior podemos ver dos elementos uno situado en el extremo
inferior derecha de la pantalla mediante el uso de los atributos
`layout_constraintBottom_toBottomOf="parent"` y
`layout_constraintEnd_toEndOf="parent"`, y otro situado exactamente al lado
izquierdo del anterior mediante el uso del atributo
`layout_constraintEnd_toStartOf=”@+id/button_one”`; es importante ver que se
generan puntos de conexión entre un origen `button_two` y un destino
`button_one`. Adicionalmente, a cada elemento se le ha asignado sus respectivos
márgenes para darle un poco de separación entre un elemento y otro, lo cual
implica que sin ellos nuestros elementos estarían uno inmediatamente al lado del
otro.

![Elemento situado exactamente al medio de la pantalla](https://cdn-images-1.medium.com/max/1600/1*Ke1_1GbCVWJfete7pgDpow.png)

En este ejemplo hemos situado el elemento exactamente en el centro de la
pantalla generando conexiones entre el elemento y su contenedor padre
representado mediante la *keyword* `parent`.

Hasta aquí es muy similar a lo que hemos podemos hacer con un *RelativeLayout*
incluso situar elementos al centro de la pantalla.

#### Bias

Recuerdo que la primera vez que leí **bias** literalmente andaba perdido. Si lo
traducimos encontraremos que entre sus traduciones está **descentrar** por lo
que podemos inferir que se refiere a mover el componente hacia un lugar u otro
de donde originalmente lo hemos situado.

Veamos esto con un ejemplo

![Elemento descentrado en un 25% vertical y horizontalmente respecto a sus
constraints originales](https://cdn-images-1.medium.com/max/1600/1*KFnW854Y5MZRqDKGsZw5hA.png)

Mediante el uso de los atributos `layout_constraintHorizontal_bias` y
`layout_constraintVertical_bias` podemos generar una cierta desviación, o mejor
dicho, podemos descentrar nuestro elemento en un porcentaje relativo. Vale
aclarar que no es obligatorio el uso de ambos atributos al mismo tiempo, ¿cuál
deberás emplear? dependerá únicamente de hacia donde desees desviar el elemento
y que el elemento tenga los *constraints* establecidos para ambos lados sea
horizontal o verticalmente.

#### Guideline

El *guideline* es un componente muy útil para crear una línea de referencia para
varios elementos que desees alinear

![Los botones están alineados en función al elemento **guideline**](https://cdn-images-1.medium.com/max/1600/1*rrleADYp0i85Dgj-KZObuA.png)

Como se aprecia en este ejemplo situamos un elemento **guideline** cuya
orientación es vertical y que está desplazado en un 25% respecto al límite
izquierdo del elemento padre.

Con nuestro elemento configurado de esa forma lo que nos resta hacer es fijar
nuestros elementos en función de él. Vale aclarar que cada elemento cuenta
adicionalmente con conexiones con los límites superior e inferior del contenedor
padre, además se les ha aplicado una desviación vertical del 25% y 75%
respectivamente.

#### Conclusión

Aunque esta es la primera parte de varios artículos, podemos ir notando el
enorme potencial que tiene **ConstraintLayout** para la construcción de
pantallas complejas. En un siguiente artículo hablaré un poco sobre el
dimensionamiento de elementos mediante los *constraints* que este componente nos
ofrece.

*****

#### Referencias

* Android Jetpack<br>
[https://developer.android.com/jetpack/](https://developer.android.com/jetpack/)
* Build a Responsive UI with ConstraintLayout<br>
[https://developer.android.com/training/constraint-layout/](https://developer.android.com/training/constraint-layout/)
* Building Interfaces with ConstraintLayout<br>
[https://www.youtube.com/watch?v=XamMbnzI5vE](https://www.youtube.com/watch?v=XamMbnzI5vE)
* Droidcon NY 2016 — ConstraintLayout, Inside and Out<br>
[https://www.youtube.com/watch?v=qwSs1uPRBiI](https://www.youtube.com/watch?v=qwSs1uPRBiI)

* [Android App
Development](https://tech.cornershop.io/tagged/android-app-development?source=post)
* [Android](https://tech.cornershop.io/tagged/android?source=post)
* [AndroidDev](https://tech.cornershop.io/tagged/androiddev?source=post)
* [Development](https://tech.cornershop.io/tagged/development?source=post)
* [Español](https://tech.cornershop.io/tagged/espaÃ±ol?source=post)

### [Armando Picón](https://tech.cornershop.io/@devpicon)

Android Engineer @ CornerShopChile • GDG Open organizer 🇵🇪, Kotlin Meetup Stgo
🇨🇱, Android Dev Podcast host

### [cornershop-tech](https://tech.cornershop.io/?source=footer_card)

Cornershop Tech News
