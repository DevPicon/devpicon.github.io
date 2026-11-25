# DevPicon Content: información y documentos de la integración

Fecha: 24 de noviembre de 2026.

## Alcance

Publicar información bilingüe y URLs estables para DevPicon Content, la integración experimental de TikTok operada por Armando Picón mediante Composio. No es un SaaS abierto al público. La aplicación y el sandbox existen en TikTok Developers; todavía no hay conexión de TikTok validada ni aprobación de producción.

No desarrollar un editor, servidor OAuth o sistema de publicación nuevo. No modificar las políticas existentes de la web, Velo o Markdown Viewer. No afirmar cumplimiento legal certificado ni aprobación de TikTok.

## Historias y aceptación

### HU-1: conocer la integración

Como visitante o revisor, quiero identificar quién opera DevPicon Content, su finalidad y estado real para entender qué servicio describen los documentos.

- Ruta pública `/es/apps/devpicon-content/` y equivalente `/en/`.
- Explicar uso interno, Composio y sandbox pendiente sin presentar funciones como verificadas.
- Enlaces visibles a términos, privacidad y contacto, sin abrir menús.
- Mantener la navegación principal existente y añadir la ficha al índice de apps.

Casos: abrir ambas rutas sin sesión; comprobar enlaces; verificar que el estado de TikTok es explícito.

### HU-2: entender el tratamiento de datos

Como titular de una cuenta autorizada, quiero saber qué datos se solicitan, con qué finalidad, quién puede procesarlos y cómo revocar acceso o pedir eliminación.

- Ruta `/es/privacy/devpicon-content/` y equivalente `/en/`.
- Limitar el documento a esta integración de TikTok, separándolo de otras conexiones independientes.
- Describir perfil, estadísticas, vídeos públicos y material elegido para subir; tokens bajo gestión de Composio.
- Explicar informes en herramientas de IA y la conservación independiente de proveedores, sin prometer borrado automático inexistente.
- Indicar contacto del operador, revocación, copias exportadas y publicaciones existentes.

Casos: verificar responsable y contacto; comprobar enlaces a TikTok, Composio y política de la web; comprobar ausencia de secretos y garantías no verificadas.

### HU-3: conocer condiciones de uso

Como operador autorizado, quiero conocer las condiciones de acceso y publicación para usar la integración con contenido propio y respetar las reglas de la plataforma.

- Ruta `/es/terms/devpicon-content/` y equivalente `/en/`.
- Identificar operador, uso restringido, autorización por acción de publicación, derechos del contenido y restricciones de terceros.
- Explicar disponibilidad experimental, revocación y cambios sin inventar suscripciones, garantías ni jurisdicción exclusiva.
- Enlazar privacidad y condiciones de TikTok.

Casos: verificar coherencia entre idiomas y documentos; comprobar que las políticas no presentan la herramienta como producto público ni habilitan publicación automática por conectar una cuenta.

## Verificación de entrega

- Ejecutar pruebas existentes y build estático de producción.
- Comprobar los seis HTML exportados, enlaces internos, metadata canonical/idiomas y legibilidad móvil/escritorio.
- Revisar diff para asegurar que solo incluye esta entrega y conservar cambios ajenos del checkout original.
- Subir rama y PR revisable. Las URLs no se consideran públicas hasta merge, despliegue y verificación HTTP.

## Evidencia de requisitos y límites

- TikTok App Review Guidelines: https://developers.tiktok.com/docs/en/app-review-guidelines
- TikTok Content Sharing Guidelines: https://developers.tiktok.com/docs/en/content-sharing-guidelines
- TikTok Register Your App: https://developers.tiktok.com/docs/en/getting-started-create-an-app
- Composio Authentication: https://docs.composio.dev/docs/authentication
- Composio Privacy Policy: https://composio.dev/privacy

Las reglas de TikTok excluyen apps privadas/personales de aprobación de producción y herramientas internas de publicación de Direct Post. Estas páginas documentan el uso real; no resuelven esa incompatibilidad. El sandbox exige icono y URLs legales para guardar su configuración. Producción añade revisión, demostración y verificación de propiedad de URLs.

## Resultado de verificación local

- 24 pruebas existentes aprobadas (4 suites).
- `npm run build` exportó las seis rutas. Advertencia preexistente en GoogleAnalytics sobre `beforeInteractive`; sin errores de compilación o tipos.
- Inspección del HTML exportado: un H1 por página, canonical de cada idioma y enlaces internos resueltos.
- Chrome: lectura de la presentación en escritorio y privacidad en móvil (390 px), sin desbordamiento horizontal (ancho del documento 375 px); cambio de idioma mantuvo la ruta de privacidad.
- Las políticas de otras apps y la navegación principal no se modificaron.
