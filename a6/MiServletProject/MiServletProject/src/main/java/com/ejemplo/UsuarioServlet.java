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
 * HTML puro sin estilos CSS.
 */
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/usuario", "/UsuarioServlet"})
public class UsuarioServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession();

        // Limpiar sesión si se solicita
        String accion = request.getParameter("accion");
        if ("limpiar".equalsIgnoreCase(accion)) {
            session.removeAttribute("nombre");
            session.removeAttribute("edad");
            session.removeAttribute("condicion");
        }

        // Leer si vienen parámetros por la URL (GET)
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

        // Obtener datos guardados en la sesión
        String nombre = (String) session.getAttribute("nombre");
        Integer edad = (Integer) session.getAttribute("edad");
        String condicion = (String) session.getAttribute("condicion");

        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html lang='es'>");
        out.println("<head>");
        out.println("    <meta charset='UTF-8'>");
        out.println("    <title>Petición GET - UsuarioServlet</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("    <h1>Petición GET recibida</h1>");

        if (nombre != null && edad != null) {
            out.println("    <h2>Usuario en sesión:</h2>");
            out.println("    <p>El usuario " + escapeHtml(nombre) + " tiene " + edad + " años. Es " + condicion + " de edad</p>");
            out.println("    <p><a href='index.html'>Crear otro usuario</a> | <a href='usuario?accion=limpiar'>Limpiar sesión</a></p>");
        } else {
            out.println("    <p>No hay ningún usuario registrado actualmente en la sesión.</p>");
            out.println("    <p><a href='index.html'>Ir al formulario</a></p>");
        }

        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        out.println("    <title>Resultado POST - UsuarioServlet</title>");
        out.println("</head>");
        out.println("<body>");

        try {
            if (edadStr == null || edadStr.trim().isEmpty()) {
                throw new NumberFormatException("La edad no puede estar vacía");
            }

            int edad = Integer.parseInt(edadStr.trim());
            String condicion = (edad >= 18) ? "mayor" : "menor";

            // Guardar usuario en la sesión para que persista en las peticiones GET
            HttpSession session = request.getSession();
            session.setAttribute("nombre", nombre);
            session.setAttribute("edad", edad);
            session.setAttribute("condicion", condicion);

            // Respuesta requerida por el enunciado
            out.println("    <h1>Resultado</h1>");
            out.println("    <p>El usuario " + escapeHtml(nombre) + " tiene " + edad + " años. Es " + condicion + " de edad</p>");
            out.println("    <p><a href='index.html'>Volver al formulario</a> | <a href='usuario'>Ver en petición GET</a></p>");

        } catch (NumberFormatException e) {
            out.println("    <h1>Error</h1>");
            out.println("    <p>La edad ingresada no es válida.</p>");
            out.println("    <p><a href='index.html'>Volver al formulario</a></p>");
        }

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
