# Web profesional de Rubén Palomo

Sitio web personal orientado a presentar servicios de desarrollo web, software a medida, automatización de procesos e inteligencia artificial aplicada para autónomos, pequeñas empresas y pymes.

La web está preparada para publicarse como sitio estático en GitHub Pages. No necesita framework, gestor de paquetes, base de datos ni proceso de compilación.

## Tecnologías

- HTML5 semántico.
- CSS moderno y responsive.
- JavaScript nativo.
- GitHub Pages.
- Datos estructurados Schema.org en formato JSON-LD.

No se cargan fuentes, librerías ni scripts de terceros. Esto reduce el peso inicial y evita dependencias innecesarias.

## Estructura principal

```text
.
├── index.html       # Contenido, metadatos SEO y datos estructurados
├── css/
│   └── style.css    # Sistema visual, componentes y responsive
├── js/
│   └── main.js      # Menú móvil, navegación y formulario
├── images/
│   └── about.jpg    # Retrato utilizado en la sección «Sobre mí»
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Ejecutar en local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador.

También es posible abrir `index.html` directamente, aunque un servidor local reproduce mejor el comportamiento del despliegue.

## Despliegue en GitHub Pages

El repositorio `RubenPalomo/rubenpalomo.github.io` publica el contenido estático de su rama configurada para Pages.

1. Integra los cambios en `main`.
2. En GitHub, abre **Settings → Pages**.
3. Comprueba que la fuente sea **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda los cambios si la configuración no estaba activa.

GitHub Pages servirá la web en `https://rubenpalomo.github.io/`.

## Editar textos y enlaces

- Los textos y secciones están en `index.html`.
- Los enlaces de LinkedIn, GitHub, teléfono y correo aparecen en `index.html`.
- Los colores, tipografía, espaciado y puntos de ruptura están en `css/style.css`.
- La dirección canónica y las URLs sociales están configuradas para `https://rubenpalomo.github.io/`.

Si cambia el dominio, hay que actualizar el enlace `canonical`, las etiquetas Open Graph, los datos JSON-LD, `robots.txt` y `sitemap.xml`.

## Formulario de contacto

El sitio no utiliza backend ni almacena datos. Al enviar el formulario, `js/main.js` genera un enlace `mailto:` dirigido a `ruben.palomof@gmail.com` con los campos completados y abre la aplicación de correo del visitante.

Esta solución es compatible con GitHub Pages y no requiere credenciales. Su funcionamiento depende de que el visitante tenga una aplicación de correo configurada; por eso también se muestran el correo y el teléfono directos en la sección de contacto.

Si en el futuro se conecta un servicio de formularios, conviene revisar su política de privacidad, protección antispam y tratamiento de datos antes de incorporarlo.

## SEO y accesibilidad

La página incluye:

- Título, descripción, canonical, Open Graph y Twitter Card.
- `lang="es"` y jerarquía de encabezados.
- Datos estructurados `Person`, `ProfessionalService` y `Service`.
- `robots.txt` y `sitemap.xml`.
- Enlace para saltar al contenido, etiquetas de formulario y estados de foco.
- Navegación por teclado y cierre del menú con `Escape`.
- Respeto a `prefers-reduced-motion`.
- Textos alternativos y enlaces externos seguros.

## Información que conviene revisar periódicamente

- Servicios que se ofrecen actualmente.
- Tecnologías que siguen formando parte del perfil profesional.
- Teléfono, correo, LinkedIn y GitHub.
- Imagen de perfil y metadatos sociales.
- Fecha y URL del sitemap si cambia el dominio.
