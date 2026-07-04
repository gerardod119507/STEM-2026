/* ============================================================
 * mapa_puente.js · PEGAR EN TU REPO STEM-2026 (GitHub Pages)
 *
 * Puente postMessage entre la Web App de GAS y tu mapa.
 * 1) Sube este archivo al repo (o pega el contenido al final
 *    de tu JS principal).
 * 2) En el index.html del mapa agrega:
 *      <script src="mapa_puente.js"></script>
 * 3) Conecta las DOS funciones marcadas con TODO a las
 *    funciones reales que ya tiene tu mapa (pintar municipios,
 *    resaltar U.E., limpiar resaltado).
 * ============================================================ */
(function () {
  "use strict";

  window.addEventListener("message", function (event) {
    /* Seguridad: la Web App de GAS vive en un subdominio ROTATORIO
       de googleusercontent.com, por eso validamos por sufijo.
       Se acepta también localhost para que puedas probar local. */
    var origenOk =
      /\.googleusercontent\.com$/.test(new URL(event.origin).hostname) ||
      event.origin.indexOf("http://localhost") === 0 ||
      event.origin.indexOf("http://127.0.0.1") === 0;
    if (!origenOk) return;

    var msg = event.data || {};
    if (msg.tipo === "OS_CONFIG") {
      // Config inicial enviada al cargar la Web App.
      // Ejemplo: activar/desactivar animaciones de tu mapa.
      if (msg.animacion === false && typeof window.detenerAnimaciones === "function") {
        window.detenerAnimaciones(); // TODO: usa tu función real si existe
      }
      console.log("[OS+ puente] Config recibida:", msg);
    }

    if (msg.tipo === "OS_FILTRO") {
      switch (msg.modo) {
        case "municipios":
          // TODO: reemplaza por tu función real, p. ej.:
          // activarCapaMunicipios(); pintarMunicipiosPorEstado("competencia");
          console.log("[OS+ puente] Resaltar municipios alcanzados vs. en competencia");
          break;
        case "ue":
          // TODO: reemplaza por tu función real, p. ej.:
          // mostrarColegios(true); filtrarUEs({ situacion: "competencia" });
          console.log("[OS+ puente] Resaltar unidades educativas en competencia");
          break;
        case "reset":
          // TODO: limpiar resaltados y volver al estado neutro del mapa.
          console.log("[OS+ puente] Quitar resaltado");
          break;
      }
    }
  });

  console.log("[OS+ puente] Escuchando mensajes de la Web App GAS.");
})();
