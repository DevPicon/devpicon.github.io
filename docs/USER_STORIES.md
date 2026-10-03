# Historias de usuario: cabecera y contacto

## Alcance

- Retirar temporalmente Contribuciones de la navegación de escritorio y móvil, manteniendo disponible su ruta directa.
- Restaurar en la marca de cabecera el efecto de tipeado para `Developer`, `Mobile` y `Applied AI`.
- Aplicar a Contacto el lenguaje visual editorial de la portada y priorizar el contacto profesional.
- Conservar el formulario de Mailchimp, el seguimiento de suscripción, la copia de email y los enlaces sociales actuales.
- No incluye publicación, cambios de contenido de Contribuciones ni cambios en la web de biblioteca independiente.

## US-01 — Identificar el perfil desde la cabecera

**Como visitante**, quiero ver los ámbitos de trabajo de Armando bajo su nombre, para entender rápidamente su perfil.

**Definición de terminado**

- El subtítulo anima las expresiones `Developer`, `Mobile` y `Applied AI` con el efecto de tipeado ya usado en el proyecto.
- La etiqueta de marca ofrece un nombre accesible estático con las tres expresiones.
- Contribuciones no aparece en la navegación de escritorio ni en la móvil; su ruta sigue existiendo.

**Casos de aceptación**

1. Abrir cualquier locale y observar que las tres expresiones aparecen en secuencia.
2. Abrir el menú móvil y confirmar que solo presenta Inicio y Contacto.
3. Abrir directamente `/es/contributions` o `/en/contributions` y confirmar que la página sigue disponible.

## US-02 — Contactar con Armando

**Como visitante**, quiero encontrar rápidamente cómo contactar a Armando y reconocer sus especialidades, para proponer una colaboración o seguir su trabajo.

**Definición de terminado**

- La página Contacto comparte los colores, tipografía, jerarquía y tratamiento de superficies de la portada.
- El email y la acción para copiarlo aparecen antes que newsletter y redes.
- Newsletter, eventos de analítica, email, copia al portapapeles y enlaces sociales mantienen su comportamiento actual.
- La composición se adapta a móvil y respeta la preferencia de movimiento reducido para la animación de la marca.

**Casos de aceptación**

1. En español e inglés, abrir Contacto y encontrar el email profesional antes del formulario.
2. Activar copiar email y confirmar el estado de confirmación.
3. Enviar el formulario de newsletter y confirmar que conserva su destino y evento analítico.
4. Seguir cada tarjeta social y confirmar que abre su destino actual en otra pestaña.
5. Revisar anchos móvil/escritorio y la presentación con movimiento reducido.
