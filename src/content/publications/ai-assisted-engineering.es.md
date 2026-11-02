# La IA puede escribir más código. Seguimos teniendo que hacer ingeniería.

Cuando alguien dice que la IA ha transformado el desarrollo de software, quiero saber a qué parte se refiere. ¿A producir una implementación? ¿A explorar un diseño? ¿A decidir si un sistema resuelve el problema correcto?

Son actividades relacionadas, pero automatizar una no resuelve las demás. Mi argumento es que los agentes pueden asumir más trabajo de implementación y colaborar en análisis, diseño y pruebas, mientras los ingenieros seguimos siendo responsables de decidir qué construir y qué evidencia basta para aceptarlo.

Eso cambia el trabajo. Las responsabilidades siguen ahí.

Me genera reparos describirlo como reemplazar a quien «pica código». Reduce a los desarrolladores a teclear, subestima aquello en lo que los agentes pueden colaborar y convierte la automatización de tareas en una afirmación sobre empleos. Para sostener que habrá reemplazo laboral hace falta más evidencia que una demostración impresionante.

Me interesa más la pregunta práctica: ¿cómo usamos estas herramientas manteniendo visibles nuestras decisiones y obteniendo feedback útil?

## Darles un lugar a las decisiones

Una conversación sirve para explorar opciones. Es un lugar frágil para conservar el único registro de una decisión de arquitectura.

El contexto del modelo es limitado. Una sesión larga puede resumirse, pasar por compaction o retomarse con información seleccionada. El resumen puede conservar la conclusión y perder la condición que la justificaba. «Usar una caché local» es distinto de «usar una caché local porque esta pantalla debe seguir siendo utilizable sin conexión».

El [informe de Anthropic sobre agentes de larga duración](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) describe problemas de continuidad entre context windows y un enfoque basado en trabajo incremental y registros persistentes de avance. También señala que la compaction puede dejar instrucciones poco claras. Es un informe de ingeniería de un proveedor sobre una configuración concreta, no una comparación universal de flujos de desarrollo.

Prefiero darles a las decisiones duraderas un lugar pequeño y revisable. Un `PROJECT_GUIDE.md` podría incluir:

- El propósito del producto y su alcance actual, con exclusiones explícitas.
- Los límites importantes del sistema y las razones de las decisiones de arquitectura.
- Las expectativas de calidad y los comandos para verificarlas.
- Enlaces a decisiones más detalladas cuando necesiten más espacio.

El nombre del archivo no tiene ningún poder especial. Un agente no necesariamente lo cargará de forma automática. Lo conectaría mediante las instrucciones de proyecto que admita la herramienta o lo incluiría explícitamente en la tarea; después comprobaría cómo lo interpretó el agente.

Para cada incremento, proporcionaría los archivos pertinentes y pediría una explicación breve del cambio previsto, las restricciones y los casos de aceptación. Una paráfrasis permite detectar temprano un malentendido; la implementación todavía debe demostrar que cumple lo solicitado.

La [discusión de Simon Willison sobre context engineering de junio de 2025](https://simonwillison.net/2025/Jun/27/context-engineering/) ayuda a enmarcar el problema de elegir información para el siguiente paso del modelo. Mi recomendación es más acotada: seleccionar ese contexto de forma deliberada e inspeccionar sus consecuencias.

Markdown por sí solo no garantiza ni recuperación ni cumplimiento. Enviar todos los documentos en cada tarea puede aumentar el contexto y el costo. La recuperación selectiva puede reducir la entrada, pero mantener los documentos, recuperarlos y corregir errores también consume recursos. Cualquier afirmación de ahorro necesita medir la tarea completa.

## Especificar el siguiente comportamiento

Pensemos en una pantalla hipotética de búsqueda móvil. Es una ilustración, no el reporte de un proyecto terminado.

La user story podría ser: «Como usuario, quiero buscar entre los elementos guardados para encontrar uno sin recorrer toda la colección». El alcance del primer incremento es la búsqueda local sobre elementos existentes. Quedan fuera la búsqueda remota y los cambios de persistencia.

Antes de implementar, dejaría explícitos estos acceptance criteria mediante casos concretos:

- Una consulta con coincidencias muestra los elementos esperados.
- Una consulta sin coincidencias muestra un estado de resultados vacíos.
- Borrar la consulta restaura la colección completa.
- Si el filtrado es asíncrono, un resultado anterior no puede sobrescribir los resultados de una consulta más reciente.

Estos casos exponen una pregunta técnica: ¿el filtrado necesita trabajo asíncrono? El agente puede ayudar a evaluar esa decisión. Deberíamos resolverla según el tamaño esperado de los datos y los requisitos de respuesta, en lugar de introducir concurrencia porque una plantilla lo pide.

Para este ejemplo, podría elegir unidirectional data flow, UI states explícitos y separación entre la lógica de filtrado y el rendering. Eso facilita inspeccionar las transiciones de estado. Otro sistema puede justificar una estructura distinta: es una decisión de ingeniería con un propósito.

La guía del proyecto debería conservar ese propósito. Las notas de cada feature deberían explicar el comportamiento y las decisiones nuevas. No necesitan reproducir toda la arquitectura.

Después del incremento, inspeccionaría el diff, ejecutaría las verificaciones pertinentes y probaría la pantalla. Si el agente reescribió la persistencia a pesar de la restricción de alcance, que las pruebas pasen no vuelve aceptable esa ampliación. Si el estado vacío se ve bien, pero la búsqueda compara el campo equivocado, una captura tampoco demuestra que funcione correctamente.

## Hacer que la generación responda ante la verificación

La salida de un agente es probabilística. La aceptación debería depender de evidencia que podamos inspeccionar y, cuando sea viable, reproducir.

Un comando local de verificación puede ejecutar controles de formato, static analysis, compilación y pruebas enfocadas. Cada control responde una pregunta distinta. Un formatter comprueba convenciones; un compilador, reglas del lenguaje y de tipos; las pruebas evalúan comportamientos seleccionados bajo condiciones seleccionadas. Ninguno demuestra que hayamos elegido el comportamiento de producto correcto.

La verificación controlada también necesita entradas controladas. Importan las versiones de las herramientas, los fixtures y las condiciones de ejecución. Las pruebas que dependen de tiempos, dispositivos, redes o servicios externos pueden ser flaky. Llamar determinista a una test suite no la convierte en tal.

Incluso una verificación perfectamente repetible puede comprobar lo equivocado. Una prueba de búsqueda podría afirmar que aparece algún resultado sin comprobar cuál. Una prueba generada puede reproducir fielmente el mismo malentendido que la implementación generada. Revisaría la assertion contra el caso de aceptación y usaría ejemplos elegidos deliberadamente, incluido un caso de fallo.

Ejecutar la aplicación aporta otra clase de evidencia: si el comportamiento tiene sentido a través de la interfaz real. Cuando importa el rendimiento, hay que definir la medición antes de declarar éxito: dispositivo, dataset, escenario y umbral. Una impresión rápida de fluidez es feedback útil, pero no es un resultado de latencia.

Los hooks pueden facilitar las verificaciones locales y detectar errores antes. Su cobertura depende de qué los activa y de si es posible eludirlos. Cuando un equipo necesita controles obligatorios, las verificaciones del servidor y las protecciones del repositorio requieren su propia configuración. Un hook local no equivale a una política remota de cumplimiento obligatorio.

El ingeniero sigue decidiendo si la evidencia justifica aceptar, revisar o rechazar. Un agente puede ayudar a reunirla; no puede completar una test suite incompleta con sólo anunciar que terminó bien.

## La documentación debe justificar su mantenimiento

Me genera escepticismo que un cambio pequeño necesite una larga cadena de documentos generados antes de poder ver un comportamiento funcionando. Cada documento es algo más que revisar, conciliar y mantener actualizado. Producir texto a bajo costo no hace que comprenderlo sea barato.

Esta es una crítica a la proporcionalidad y a la cadencia de feedback. Spec-driven development tiene varios significados. El [análisis de Birgitta Böckeler de 2025 sobre Kiro, spec-kit y Tessl](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) distingue enfoques que escriben especificaciones primero, las conservan durante el mantenimiento o las tratan como fuente principal. Esas diferencias importan al discutir costos y control.

La [crítica de François Zaninotto a los flujos cargados de documentación](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html) plantea preocupaciones sobre el esfuerzo de revisión y el seguimiento de instrucciones a partir de ejemplos reportados. Son casos útiles para orientar una investigación. No demuestran que las especificaciones, en general, causen peores resultados.

Una especificación incremental puede favorecer el feedback rápido. Agile no significa evitar la documentación: sus [principios](https://agilemanifesto.org/principles.html) destacan el software funcionando con frecuencia, la excelencia técnica y la adaptación. Un caso de aceptación breve puede servir a esos objetivos; también un diseño detallado cuando el riesgo lo justifica.

Especificaciones más rigurosas pueden ser valiosas para restricciones de seguridad, trabajo regulado, interfaces públicas, compatibilidad de migraciones y coordinación entre equipos. En esos contextos, una guía concisa es la puerta de entrada al detalle necesario. No puede reemplazarlo.

Mi criterio para un documento es práctico: ¿qué decisión, implementación o verificación respalda, y quién lo mantendrá? Conservaría la explicación de una restricción de compatibilidad aunque ocupara varias páginas. Quitaría la prosa repetida que no cambia una decisión ni ayuda a evaluar el trabajo.

La [colección de engineering skills de Matt Pocock](https://github.com/mattpocock/skills) ofrece otro ejemplo de cómo organizar orientación en piezas adaptables y componibles. Me parece una dirección útil. Los objetivos declarados de su diseño no prueban que una colección de skills supere a otro flujo de trabajo.

## Mantener explícita la decisión de aceptar

Un incremento pequeño también puede contener un supuesto equivocado. Su ventaja es darnos una oportunidad más temprana y acotada de descubrirlo.

El ciclo que propongo es directo: definir el siguiente comportamiento, proporcionar el contexto que necesita, comprobar la interpretación, inspeccionar el cambio, reunir evidencia y decidir si se acepta. Actualizar las guías duraderas cuando cambie una decisión. Si la revisión se vuelve inmanejable, reducir el incremento o mejorar las verificaciones antes de pedirle al agente que produzca más.

Este enfoque tiene límites. Depende de la comprensión del ingeniero, de la calidad de la evidencia y del costo de mantener las guías actualizadas. Este artículo presenta una postura de trabajo, no un estudio controlado ni una mejora de productividad demostrada. Para demostrarla harían falta tareas comparables y contabilizar revisión, retrabajo, defectos y mantenimiento, además del tiempo de generación.

Me siento cómodo delegando más trabajo cuando puedo explicar qué se pidió, qué cambió y por qué la evidencia justifica aceptarlo. Ese es el estándar de ingeniería que quiero llevar al desarrollo asistido por IA.

¿Qué decisiones de tu flujo siguen siendo visibles cuando termina la conversación y qué evidencia te indica que el agente las respetó?

---

Nota de autoría: El borrador inicial se generó con asistencia de IA a partir de los argumentos de Armando Picón y una revisión de fuentes. Armando revisó el artículo y aprobó su publicación. La traducción al español se realizó con asistencia de IA. El ejemplo móvil es hipotético.
