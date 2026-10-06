package com.ejemplo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet que atiende peticiones GET y POST para la práctica a6.
 * Guarda los datos del usuario en la sesión para que puedan consultarse vía GET.
 */
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/usuario", "/UsuarioServlet"})
public class UsuarioServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession();

        // Si se pide limpiar la sesión
        String accion = request.getParameter("accion");
        if ("limpiar".equalsIgnoreCase(accion)) {
            session.removeAttribute("nombre");
            session.removeAttribute("edad");
            session.removeAttribute("condicion");
        }

        // 1. Revisar si se enviaron parámetros directos por URL (GET)
        String nombreParam = request.getParameter("nombre");
        String edadParam = request.getParameter("edad");

        if (nombreParam != null && edadParam != null) {
            try {
                int edad = Integer.parseInt(edadParam.trim());
                String condicion = (edad >= 18) ? "mayor" : "menor";
                session.setAttribute("nombre", nombreParam.trim());
                session.setAttribute("edad", edad);
                session.setAttribute("condicion", condicion);
            } catch (NumberFormatException ignored) {}
        }

        // 2. Obtener datos guardados en la sesión (creados por POST o GET previo)
        String nombre = (String) session.getAttribute("nombre");
        Integer edad = (Integer) session.getAttribute("edad");
        String condicion = (String) session.getAttribute("condicion");

        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html lang='es'>");
        out.println("<head>");
        out.println("    <meta charset='UTF-8'>");
        out.println("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        out.println("    <title>Consulta GET - UsuarioServlet</title>");
        out.println("    <style>");
        out.println("        :root { --bg: #0f172a; --card: #1e293b; --text: #f8fafc; --muted: #94a3b8; --primary: #6366f1; }");
        out.println("        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }");
        out.println("        body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #1e1b4b, #0f172a); color: var(--text); padding: 20px; }");
        out.println("        .card { background: rgba(30, 41, 59, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 36px; max-width: 520px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; }");
        out.println("        .badge { display: inline-block; padding: 6px 14px; font-size: 0.85rem; font-weight: 600; border-radius: 9999px; margin-bottom: 18px; }");
        out.println("        .badge-info { background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3); }");
        out.println("        .badge-mayor { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }");
        out.println("        .badge-menor { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }");
        out.println("        h1 { font-size: 1.6rem; margin-bottom: 14px; font-weight: 700; color: #ffffff; }");
        out.println("        .resultado-box { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left; }");
        out.println("        .mensaje { font-size: 1.15rem; line-height: 1.6; color: #f1f5f9; text-align: center; margin-bottom: 12px; }");
        out.println("        .mensaje strong { color: #a5b4fc; }");
        out.println("        .dato-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.95rem; }");
        out.println("        .dato-item:last-child { border-bottom: none; }");
        out.println("        .dato-label { color: var(--muted); }");
        out.println("        .dato-val { font-weight: 600; color: #ffffff; }");
        out.println("        .vacio-box { background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(255,255,255,0.15); border-radius: 12px; padding: 24px; margin-bottom: 24px; }");
        out.println("        .vacio-msg { color: var(--muted); line-height: 1.6; }");
        out.println("        .btn-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 10px; }");
        out.println("        .btn { display: inline-block; padding: 12px 24px; font-weight: 600; color: #fff; background: linear-gradient(135deg, #4f46e5, #6366f1); border-radius: 10px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); }");
        out.println("        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6); }");
        out.println("        .btn-secundario { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); box-shadow: none; color: #cbd5e1; }");
        out.println("        .btn-secundario:hover { background: rgba(255,255,255,0.12); color: #ffffff; }");
        out.println("    </style>");
        out.println("</head>");
        out.println("<body>");
        out.println("    <div class='card'>");

        if (nombre != null && edad != null) {
            String badgeClass = (edad >= 18) ? "badge-mayor" : "badge-menor";
            String badgeText = (edad >= 18) ? "Mayor de edad" : "Menor de edad";

            out.println("        <span class='badge " + badgeClass + "'>Petición GET • " + badgeText + "</span>");
            out.println("        <h1>Usuario en Sesión</h1>");
            out.println("        <div class='resultado-box'>");
            out.println("            <p class='mensaje'>El usuario <strong>" + escapeHtml(nombre) + "</strong> tiene <strong>" + edad + "</strong> años. Es " + condicion + " de edad</p>");
            out.println("            <div class='dato-item'><span class='dato-label'>Nombre:</span><span class='dato-val'>" + escapeHtml(nombre) + "</span></div>");
            out.println("            <div class='dato-item'><span class='dato-label'>Edad:</span><span class='dato-val'>" + edad + " años</span></div>");
            out.println("            <div class='dato-item'><span class='dato-label'>Condición:</span><span class='dato-val'>" + (edad >= 18 ? "Mayor de edad (>=18)" : "Menor de edad (<18)") + "</span></div>");
            out.println("        </div>");
            out.println("        <div class='btn-group'>");
            out.println("            <a href='index.html' class='btn'>Crear otro usuario</a>");
            out.println("            <a href='usuario?accion=limpiar' class='btn btn-secundario'>Limpiar sesión</a>");
            out.println("        </div>");
        } else {
            out.println("        <span class='badge badge-info'>Petición GET Recibida</span>");
            out.println("        <h1>Sin Usuario en Sesión</h1>");
            out.println("        <div class='vacio-box'>");
            out.println("            <p class='vacio-msg'>Todavía no se ha registrado ningún usuario en la sesión.<br><br>Por favor, ingrese un nombre y una edad en el formulario para crearlo mediante <strong>POST</strong>.</p>");
            out.println("        </div>");
            out.println("        <div class='btn-group'>");
            out.println("            <a href='index.html' class='btn'>Ir al formulario</a>");
            out.println("        </div>");
        }

        out.println("    </div>");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Soporte para caracteres en español (tildes, eñes)
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        String nombre = request.getParameter("nombre");
        String edadStr = request.getParameter("edad");

        if (nombre == null || nombre.trim().isEmpty()) {
            nombre = "Anónimo";
        } else {
            nombre = nombre.trim();
        }

        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html lang='es'>");
        out.println("<head>");
        out.println("    <meta charset='UTF-8'>");
        out.println("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        out.println("    <title>Respuesta POST - Validación de Usuario</title>");
        out.println("    <style>");
        out.println("        :root { --bg: #0f172a; --card: #1e293b; --text: #f8fafc; --muted: #94a3b8; }");
        out.println("        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }");
        out.println("        body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #1e1b4b, #0f172a); color: var(--text); padding: 20px; }");
        out.println("        .card { background: rgba(30, 41, 59, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; max-width: 540px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; }");
        out.println("        .badge { display: inline-block; padding: 6px 16px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 9999px; margin-bottom: 20px; }");
        out.println("        .badge-mayor { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }");
        out.println("        .badge-menor { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }");
        out.println("        .badge-error { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }");
        out.println("        h1 { font-size: 1.6rem; margin-bottom: 16px; font-weight: 700; color: #ffffff; }");
        out.println("        .resultado-box { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 28px; }");
        out.println("        .mensaje { font-size: 1.15rem; line-height: 1.6; color: #f1f5f9; }");
        out.println("        .mensaje strong { color: #a5b4fc; }");
        out.println("        .error-msg { font-size: 1.05rem; color: #fca5a5; line-height: 1.5; }");
        out.println("        .btn-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }");
        out.println("        .btn { display: inline-block; padding: 12px 24px; font-weight: 600; color: #fff; background: linear-gradient(135deg, #4f46e5, #6366f1); border-radius: 10px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); }");
        out.println("        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6); }");
        out.println("        .btn-secundario { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); box-shadow: none; color: #cbd5e1; }");
        out.println("        .btn-secundario:hover { background: rgba(255,255,255,0.12); color: #ffffff; }");
        out.println("    </style>");
        out.println("</head>");
        out.println("<body>");
        out.println("    <div class='card'>");

        try {
            if (edadStr == null || edadStr.trim().isEmpty()) {
                throw new NumberFormatException("La edad no puede estar vacía");
            }

            int edad = Integer.parseInt(edadStr.trim());
            if (edad < 0 || edad > 150) {
                throw new IllegalArgumentException("La edad debe ser un número coherente (0 a 150).");
            }

            String condicion = (edad >= 18) ? "mayor" : "menor";
            String badgeClass = (edad >= 18) ? "badge-mayor" : "badge-menor";
            String badgeText = (edad >= 18) ? "Mayor de edad" : "Menor de edad";

            // Guardar usuario en la sesión para que persista en las peticiones GET
            HttpSession session = request.getSession();
            session.setAttribute("nombre", nombre);
            session.setAttribute("edad", edad);
            session.setAttribute("condicion", condicion);

            // Respuesta requerida: "El usuario [nombre] tiene [edad] años. Es mayor/menor de edad"
            String textoRespuesta = "El usuario " + escapeHtml(nombre) + " tiene " + edad + " años. Es " + condicion + " de edad";

            out.println("        <span class='badge " + badgeClass + "'>" + badgeText + "</span>");
            out.println("        <h1>Resultado de Validación</h1>");
            out.println("        <div class='resultado-box'>");
            out.println("            <p class='mensaje'>" + textoRespuesta + "</p>");
            out.println("        </div>");
            out.println("        <div class='btn-group'>");
            out.println("            <a href='index.html' class='btn'>Volver al formulario</a>");
            out.println("            <a href='usuario' class='btn btn-secundario'>Ver en petición GET</a>");
            out.println("        </div>");

        } catch (NumberFormatException e) {
            out.println("        <span class='badge badge-error'>Error de Entrada</span>");
            out.println("        <h1>Dato Inválido</h1>");
            out.println("        <div class='resultado-box'>");
            out.println("            <p class='error-msg'>La edad ingresada no es un número entero válido.</p>");
            out.println("        </div>");
            out.println("        <div class='btn-group'>");
            out.println("            <a href='index.html' class='btn'>Volver al formulario</a>");
            out.println("        </div>");
        } catch (IllegalArgumentException e) {
            out.println("        <span class='badge badge-error'>Error de Rango</span>");
            out.println("        <h1>Edad Fuera de Rango</h1>");
            out.println("        <div class='resultado-box'>");
            out.println("            <p class='error-msg'>" + escapeHtml(e.getMessage()) + "</p>");
            out.println("        </div>");
            out.println("        <div class='btn-group'>");
            out.println("            <a href='index.html' class='btn'>Volver al formulario</a>");
            out.println("        </div>");
        }

        out.println("    </div>");
        out.println("</body>");
        out.println("</html>");
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#x27;");
    }
}
