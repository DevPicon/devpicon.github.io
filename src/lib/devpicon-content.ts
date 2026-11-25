import type { Locale } from '@/i18n';

export type ContentDocument = 'overview' | 'privacy' | 'terms';

interface DocumentCopy {
  title: string;
  description: string;
  sections: { title: string; paragraphs: string[] }[];
}

export const contentDocumentPaths: Record<ContentDocument, string> = {
  overview: 'apps/devpicon-content',
  privacy: 'privacy/devpicon-content',
  terms: 'terms/devpicon-content',
};

export const contentLabels = {
  es: {
    updated: 'Versión del 24 de noviembre de 2026',
    overview: 'Sobre la integración',
    privacy: 'Política de privacidad',
    terms: 'Términos de servicio',
    contact: 'Contacto',
    contactBody: 'Operador: Armando Picón (DevPicon). Para consultas, revocación de acceso o solicitudes sobre datos:',
    sources: 'Servicios y documentación relacionados',
    websitePrivacy: 'Privacidad de picon.dev',
    navigation: 'Documentos de DevPicon Content',
  },
  en: {
    updated: 'Version dated November 24, 2026',
    overview: 'About the integration',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
    contact: 'Contact',
    contactBody: 'Operator: Armando Picón (DevPicon). For questions, access revocation or data requests:',
    sources: 'Related services and documentation',
    websitePrivacy: 'picon.dev privacy',
    navigation: 'DevPicon Content documents',
  },
} satisfies Record<Locale, Record<string, string>>;

export const contentDocuments: Record<Locale, Record<ContentDocument, DocumentCopy>> = {
  es: {
    overview: {
      title: 'DevPicon Content',
      description: 'Información sobre la integración experimental de TikTok y el flujo editorial interno de DevPicon.',
      sections: [
        {
          title: 'Qué es y quién lo opera',
          paragraphs: ['DevPicon Content es el nombre de la integración de TikTok que Armando Picón está preparando para su flujo editorial de DevPicon. Su finalidad es consultar datos de las cuentas autorizadas y preparar el envío de contenido original mediante Composio y herramientas de asistencia con IA.', 'Es una herramienta interna en configuración. Esta web publica su información y documentos; no ofrece registro, conexión de cuentas ni un panel de publicación al público.'],
        },
        {
          title: 'Estado de la integración',
          paragraphs: ['El sandbox está configurado y la conexión de @devpicon mediante Composio se validó con una lectura de perfil y estadísticas. Direct Post está habilitado únicamente en el sandbox; no se han realizado cargas ni publicaciones durante la validación. No hay aprobación para producción ni publicación pública verificada desde esta integración.', 'Las conexiones independientes de Instagram, YouTube y LinkedIn del operador no constituyen una autorización de TikTok. Las políticas de esta página cubren DevPicon Content y su integración de TikTok.'],
        },
        {
          title: 'Cómo se prevé utilizar',
          paragraphs: ['El titular autoriza su cuenta en TikTok; Composio gestiona la conexión y ejecuta las solicitudes permitidas. El flujo puede consultar perfil, estadísticas y vídeos públicos para preparar informes, o enviar material elegido por el operador como borrador si esa función está habilitada y autorizada.', 'Conectar una cuenta no autoriza por sí solo a publicar una pieza. El operador revisa el contenido, sus derechos y el destino antes de solicitar una publicación.'],
        },
        {
          title: 'Límites de TikTok',
          paragraphs: ['El uso de un sandbox no equivale a aprobación de producción. Las reglas de revisión de TikTok excluyen aplicaciones de uso privado o personal, y las de Direct Post excluyen utilidades destinadas únicamente a publicar en cuentas propias o del equipo. Este flujo interno no se presenta como un producto público para eludir esos límites.', 'Las páginas legales documentan el uso previsto; no garantizan acceso a funciones, aprobación, cuotas ni disponibilidad de la API.'],
        },
      ],
    },
    privacy: {
      title: 'Política de privacidad de DevPicon Content',
      description: 'Datos, proveedores, conservación y opciones de control de la integración de TikTok DevPicon Content.',
      sections: [
        {
          title: '1. Responsable y alcance',
          paragraphs: ['Armando Picón (DevPicon) opera esta integración experimental de TikTok. Esta política describe el tratamiento de datos dentro de ese flujo. No sustituye la política general de picon.dev ni las políticas de otras conexiones que el operador utilice por separado.', 'La integración es de uso interno y no tiene registro público. Se ha validado la lectura de perfil y estadísticas de @devpicon en el sandbox; no hay aprobación para producción.'],
        },
        {
          title: '2. Datos y permisos',
          paragraphs: ['Según los permisos que el titular conceda y la disponibilidad de TikTok, el flujo puede recibir identificadores de cuenta, nombre visible, avatar, enlace de perfil, biografía y estado de verificación; recuentos de seguidores, seguidos, me gusta y vídeos; y datos de vídeos públicos, como identificadores, títulos, enlaces y métricas disponibles.', 'Para enviar contenido se utiliza el archivo o URL, texto y opciones que el operador elija. Los permisos de perfil básico, perfil ampliado, estadísticas, lista de vídeos, envío de borradores y publicación se solicitan solo para esas funciones. La disponibilidad de un permiso no implica que se haya ejercido.', 'La autorización se realiza en TikTok. Composio gestiona las credenciales de la conexión y su renovación; no se solicita introducir la contraseña de TikTok en picon.dev.'],
        },
        {
          title: '3. Finalidades y autorización',
          paragraphs: ['Los datos se utilizan para identificar la cuenta correcta, preparar contenido propio, ejecutar envíos expresamente solicitados, comprobar su estado, analizar rendimiento editorial y resolver errores de integración. La conexión depende de la autorización del titular y puede revocarse.', 'Este flujo no está destinado a vender datos, crear perfiles publicitarios de la audiencia, recolectar mensajes privados o gestionar cuentas sin autorización.'],
        },
        {
          title: '4. Proveedores y herramientas de IA',
          paragraphs: ['TikTok recibe las solicitudes a su API y cualquier contenido enviado a su plataforma. Composio actúa como intermediario técnico de autenticación y ejecución y puede conservar datos de conexión y registros conforme a sus propias condiciones y a la configuración de la cuenta.', 'Cuando el operador solicita un informe o análisis en Codex/ChatGPT u otra herramienta de IA, los datos incluidos en la solicitud y las respuestas de las herramientas también pueden procesarse y permanecer en ese servicio. El flujo utiliza servicios en la nube y no se describe como procesamiento exclusivamente local.', 'Estos proveedores pueden tratar datos fuera del país del operador o del titular. Sus políticas y controles de cuenta regulan su propio tratamiento. Los enlaces de referencia se encuentran al final de esta página.'],
        },
        {
          title: '5. Conservación y copias',
          paragraphs: ['El flujo no tiene un mecanismo propio de borrado automático de informes o conversaciones. Las credenciales y registros de Composio, las conversaciones de la herramienta de IA y las publicaciones de TikTok tienen ciclos de conservación distintos. No se promete una eliminación inmediata ni un plazo único para todos ellos.', 'Los informes o archivos exportados a almacenamiento local u otros servicios permanecen hasta que el operador los elimine. Se debe limitar su contenido a lo necesario y revisar su conservación. Revocar acceso detiene futuras solicitudes autorizadas, pero no borra automáticamente informes históricos, copias exportadas o publicaciones existentes.'],
        },
        {
          title: '6. Revocación, acceso y eliminación',
          paragraphs: ['Puedes retirar el acceso desde los ajustes de aplicaciones o permisos conectados de TikTok y desconectar la cuenta en Composio. Para solicitar información, corrección o eliminación de copias bajo control del operador, escribe al contacto indicado abajo con la cuenta o contenido afectado; no envíes contraseñas ni tokens.', 'El operador verificará que la solicitud corresponde al titular y revisará las copias que controla, las obligaciones aplicables y cualquier limitación de los proveedores. Para datos conservados directamente por TikTok, Composio o la herramienta de IA, también pueden ser necesarios sus propios controles o canales de solicitud.'],
        },
        {
          title: '7. Seguridad y visitantes de esta web',
          paragraphs: ['Las credenciales no deben incorporarse a repositorios, páginas públicas o informes. Composio documenta cifrado de credenciales y gestión de OAuth en su infraestructura; eso no constituye una garantía de seguridad absoluta del flujo completo.', 'Leer estas páginas no conecta ninguna cuenta social. El alojamiento, las preferencias y la analítica de picon.dev se describen en la política general de la web, enlazada al final.'],
        },
        {
          title: '8. Cambios y menores',
          paragraphs: ['La integración no está dirigida a menores ni admite alta pública. Si cambian las funciones, los permisos o los proveedores utilizados, se actualizará esta política con una nueva fecha antes de utilizar esos cambios.'],
        },
      ],
    },
    terms: {
      title: 'Términos de servicio de DevPicon Content',
      description: 'Condiciones de acceso y uso de la integración experimental de TikTok operada por DevPicon.',
      sections: [
        {
          title: '1. Operador y servicio',
          paragraphs: ['DevPicon Content es una integración experimental operada por Armando Picón para su flujo editorial interno. Se configura mediante TikTok for Developers, Composio y herramientas de asistencia con IA. Estas páginas son informativas: no ofrecen un servicio de suscripción, registro público ni un panel de publicación.', 'Estos términos corresponden a esta integración de TikTok; no modifican las condiciones de otros servicios o conexiones independientes.'],
        },
        {
          title: '2. Acceso autorizado',
          paragraphs: ['Solo el titular de una cuenta o una persona con autorización suficiente puede conectarla y solicitar operaciones sobre ella. El uso debe respetar estos términos, las condiciones de TikTok y Composio y las normas aplicables. Ningún permiso de la API autoriza actuaciones ajenas a la solicitud del titular.', 'No se debe compartir contraseñas o secretos en informes ni utilizar cuentas, contenido o datos sin autorización.'],
        },
        {
          title: '3. Revisión y publicación',
          paragraphs: ['El operador debe revisar la pieza, el texto, la cuenta de destino y las opciones de visibilidad antes de solicitar su envío o publicación. Conectar una cuenta o generar un borrador no equivale a aprobar su publicación.', 'La IA puede producir errores y las métricas pueden tener retrasos o limitaciones. El operador debe verificar sus resultados antes de tomar decisiones o compartirlos. No se garantiza la entrega, la programación exacta, el alcance o el rendimiento de ninguna publicación.'],
        },
        {
          title: '4. Derechos y usos prohibidos',
          paragraphs: ['El titular conserva los derechos que le correspondan sobre su contenido. Para solicitar un envío debe disponer de los derechos sobre el vídeo, imagen, voz, música y demás material, incluidas las autorizaciones necesarias de otras personas.', 'La autorización para tratar contenido se limita a las operaciones solicitadas y al tratamiento técnico necesario por los proveedores. No se debe utilizar el flujo para spam, suplantación, extracción de datos privados, evasión de permisos o republicación de material ajeno sin derechos.'],
        },
        {
          title: '5. Sandbox y servicios externos',
          paragraphs: ['La conexión de TikTok en el sandbox se ha validado mediante lectura de perfil y estadísticas. La carga y publicación no se han probado. El sandbox es un entorno de pruebas con restricciones; no equivale a aprobación de producción ni habilita por sí mismo publicación pública.', 'TikTok impone condiciones de elegibilidad, revisión y uso que pueden impedir este caso interno. Publicar estos documentos no elimina esas condiciones. Las API y Composio pueden cambiar, suspender operaciones o aplicar cuotas y errores.'],
        },
        {
          title: '6. Datos y desconexión',
          paragraphs: ['El tratamiento de datos se explica en la política de privacidad de DevPicon Content. La autorización puede retirarse desde TikTok y la conexión puede desconectarse en Composio.', 'Desconectar no elimina contenido ya publicado ni todas las copias de informes o conversaciones. Para solicitar revisión o eliminación de copias controladas por el operador, utiliza el contacto de esta página.'],
        },
        {
          title: '7. Disponibilidad y responsabilidad',
          paragraphs: ['La integración se ofrece en estado experimental, sin compromiso de soporte continuo, disponibilidad o compatibilidad futura. El operador puede suspenderla para corregir errores, atender una revocación o respetar las restricciones de los proveedores.', 'Estos términos no excluyen derechos irrenunciables ni responsabilidades que no puedan limitarse conforme a la legislación aplicable. No se pacta aquí una jurisdicción exclusiva ni una renuncia general de derechos.'],
        },
        {
          title: '8. Cambios y consultas',
          paragraphs: ['Los cambios de alcance o condiciones se reflejarán en esta página con una fecha actualizada antes de utilizar la funcionalidad afectada. Puedes consultar al operador antes de autorizar una operación o solicitar que se detenga el uso de tu cuenta.'],
        },
      ],
    },
  },
  en: {
    overview: {
      title: 'DevPicon Content',
      description: 'Information about DevPicon’s experimental TikTok integration and internal editorial workflow.',
      sections: [
        { title: 'Purpose and operator', paragraphs: ['DevPicon Content is the name of the TikTok integration Armando Picón is preparing for the DevPicon editorial workflow. Its purpose is to retrieve data from authorized accounts and prepare original content submissions through Composio and AI assistance tools.', 'It is an internal tool being configured. This website publishes its information and documents; it does not offer public registration, account connection or a publishing dashboard.'] },
        { title: 'Integration status', paragraphs: ['The sandbox is configured and the @devpicon connection through Composio was validated by reading profile information and statistics. Direct Post is enabled only in the sandbox; no uploads or publications were performed during validation. This integration has no production approval or verified public publishing capability.', 'The operator’s separate Instagram, YouTube and LinkedIn connections do not constitute TikTok authorization. These documents cover DevPicon Content and its TikTok integration.'] },
        { title: 'Intended workflow', paragraphs: ['The account holder authorizes access on TikTok; Composio manages the connection and executes permitted requests. The workflow may retrieve profile details, statistics and public videos for reports, or submit material selected by the operator as a draft when that function is enabled and authorized.', 'Connecting an account does not itself authorize publication of a piece. The operator reviews the content, its rights and destination before requesting publication.'] },
        { title: 'TikTok limitations', paragraphs: ['A sandbox is not production approval. TikTok’s app review rules exclude private or personal-use applications, and its Direct Post rules exclude utilities intended only to publish to accounts managed by the developer or their team. This internal workflow is not presented as a public product to bypass those limits.', 'These legal pages document the intended use; they do not guarantee feature access, approval, quotas or API availability.'] },
      ],
    },
    privacy: {
      title: 'DevPicon Content Privacy Policy',
      description: 'Data, providers, retention and control options for the DevPicon Content TikTok integration.',
      sections: [
        { title: '1. Operator and scope', paragraphs: ['Armando Picón (DevPicon) operates this experimental TikTok integration. This policy describes data processing within that workflow. It does not replace the general picon.dev privacy policy or the policies of other connections the operator uses separately.', 'The integration is internal and has no public registration. Reading profile information and statistics for @devpicon has been validated in the sandbox; there is no production approval.'] },
        { title: '2. Data and permissions', paragraphs: ['Subject to permissions granted by the account holder and TikTok availability, the workflow may receive account identifiers, display name, avatar, profile link, biography and verification status; follower, following, like and video counts; and public video data such as identifiers, titles, links and available metrics.', 'Content submission uses the file or URL, text and options selected by the operator. Basic profile, extended profile, statistics, video list, draft upload and publishing permissions are requested only for those functions. A permission being available does not mean it has been exercised.', 'Authorization takes place on TikTok. Composio manages connection credentials and renewal; picon.dev does not ask for a TikTok password.'] },
        { title: '3. Purposes and authorization', paragraphs: ['Data is used to identify the correct account, prepare original content, execute expressly requested submissions, check their status, analyze editorial performance and troubleshoot integration errors. The connection depends on the account holder’s authorization, which can be revoked.', 'This workflow is not intended to sell data, build audience advertising profiles, collect private messages or manage accounts without authorization.'] },
        { title: '4. Providers and AI tools', paragraphs: ['TikTok receives API requests and any content submitted to its platform. Composio acts as the technical authentication and execution intermediary and may retain connection data and logs under its own terms and account configuration.', 'When the operator requests a report or analysis in Codex/ChatGPT or another AI tool, data included in requests and tool responses may also be processed and retained by that service. The workflow uses cloud services and is not described as local-only processing.', 'These providers may process data outside the operator’s or account holder’s country. Their own policies and account controls govern their processing. Reference links appear at the end of this page.'] },
        { title: '5. Retention and copies', paragraphs: ['The workflow has no automatic deletion mechanism of its own for reports or conversations. Composio credentials and logs, AI tool conversations and TikTok publications have separate retention cycles. Immediate deletion or a single retention period across all providers is not promised.', 'Reports or files exported to local storage or other services remain until the operator removes them. Their contents should be limited to what is needed and retention reviewed. Revoking access stops future authorized requests but does not automatically remove historical reports, exports or existing publications.'] },
        { title: '6. Revocation, access and deletion', paragraphs: ['You can revoke access through TikTok’s connected app or permission settings and disconnect the account in Composio. To request information, correction or removal of copies controlled by the operator, use the contact below and identify the affected account or content; do not send passwords or tokens.', 'The operator will verify that the request comes from the account holder and review controlled copies, applicable obligations and provider limitations. Data retained directly by TikTok, Composio or the AI tool may also require using their own controls or request channels.'] },
        { title: '7. Security and website visitors', paragraphs: ['Credentials must not be included in repositories, public pages or reports. Composio documents credential encryption and OAuth management within its infrastructure; this does not guarantee absolute security of the entire workflow.', 'Reading these pages does not connect a social account. picon.dev hosting, preferences and analytics are described in the general website policy linked below.'] },
        { title: '8. Changes and minors', paragraphs: ['The integration is not directed at minors and does not offer public registration. Changes to functions, permissions or providers will be reflected in this policy with an updated date before those changes are used.'] },
      ],
    },
    terms: {
      title: 'DevPicon Content Terms of Service',
      description: 'Access and usage conditions for DevPicon’s experimental TikTok integration.',
      sections: [
        { title: '1. Operator and service', paragraphs: ['DevPicon Content is an experimental integration operated by Armando Picón for his internal editorial workflow. It is configured through TikTok for Developers, Composio and AI assistance tools. These pages are informational: they do not offer a subscription service, public registration or a publishing dashboard.', 'These terms cover this TikTok integration; they do not modify the terms of other services or independent connections.'] },
        { title: '2. Authorized access', paragraphs: ['Only an account holder or a sufficiently authorized person may connect an account and request operations on it. Use must respect these terms, TikTok and Composio terms and applicable rules. No API permission authorizes actions outside the account holder’s request.', 'Passwords and secrets must not be shared in reports. Accounts, content or data must not be used without authorization.'] },
        { title: '3. Review and publication', paragraphs: ['The operator must review each piece, its text, destination account and visibility options before requesting submission or publication. Connecting an account or generating a draft does not approve publication.', 'AI can produce errors and metrics may be delayed or limited. The operator must verify results before making decisions or sharing them. Delivery, exact scheduling, reach and publication performance are not guaranteed.'] },
        { title: '4. Rights and prohibited uses', paragraphs: ['The account holder retains their rights in their content. A submission requires the necessary rights to video, images, voice, music and other materials, including required permissions from other people.', 'Permission to process content is limited to requested operations and necessary technical processing by providers. The workflow must not be used for spam, impersonation, extraction of private data, permission evasion or republication of material without rights.'] },
        { title: '5. Sandbox and external services', paragraphs: ['The TikTok sandbox connection was validated by reading profile information and statistics. Uploads and publishing have not been tested. The sandbox is a restricted testing environment; it is not production approval and does not itself enable public publishing.', 'TikTok imposes eligibility, review and usage requirements that may prevent this internal use case. Publishing these documents does not remove those requirements. APIs and Composio may change, suspend operations or impose quotas and errors.'] },
        { title: '6. Data and disconnection', paragraphs: ['Data processing is described in the DevPicon Content privacy policy. Authorization can be revoked on TikTok and the connection can be disconnected in Composio.', 'Disconnection does not remove already published content or all report and conversation copies. Use the contact on this page to request review or removal of copies controlled by the operator.'] },
        { title: '7. Availability and responsibility', paragraphs: ['The integration is experimental, with no commitment to continuous support, availability or future compatibility. The operator may suspend it to correct errors, honor a revocation or respect provider restrictions.', 'These terms do not exclude non-waivable rights or liabilities that cannot be limited under applicable law. They do not establish exclusive jurisdiction or a general waiver of rights.'] },
        { title: '8. Changes and questions', paragraphs: ['Changes to scope or terms will appear on this page with an updated date before the affected functionality is used. You can contact the operator before authorizing an operation or ask for use of your account to stop.'] },
      ],
    },
  },
};
