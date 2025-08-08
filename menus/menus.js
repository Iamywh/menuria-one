const menus = [
            {
                title: "Menú de Bebidas",
                bg: "#f4fbff",
                accent: "#2b7da9",
                note: "Refrescos, aguas y bebidas para todos los gustos.",
                mode: "",
                items: [
                    { nombre: "Agua Pequeña", ingredientes: "", precio: "1,50 €" },
                    { nombre: "Agua Grande", ingredientes: "", precio: "2,60 €" },
                    { nombre: "Agua Pequeña con Gas", ingredientes: "", precio: "1,70 €" },
                    { nombre: "Agua Grande con Gas", ingredientes: "", precio: "2,60 €" },
                    { nombre: "Refrescos", ingredientes: "", precio: "2,60 €" },
                    { nombre: "Appletiser", ingredientes: "", precio: "2,00 €" },
                    { nombre: "Tónica", ingredientes: "", precio: "1,60 €" },
                    { nombre: "Tónica de fresa", ingredientes: "", precio: "1,70 €" },
                    { nombre: "Ginger ale - ginger beer", ingredientes: "", precio: "2,00 €" },
                    { nombre: "Caña", ingredientes: "", precio: "1,80 €" },
                    { nombre: "Jarra", ingredientes: "", precio: "2,50 €" },
                    { nombre: "Dorada pilsen", ingredientes: "", precio: "2,50 €" },
                    { nombre: "Dorada especial", ingredientes: "", precio: "2,80 €" },
                    { nombre: "Dorada tostada", ingredientes: "", precio: "2,80 €" },
                    { nombre: "Dorada sin con limon", ingredientes: "", precio: "2,70 €" },
                    { nombre: "Dorada sin alcohol", ingredientes: "", precio: "2,50 €" },
                    { nombre: "Corona", ingredientes: "", precio: "3,00 €" },
                    { nombre: "Sidra Kopparberg", ingredientes: "", precio: "3,50 €" },
                    { nombre: "Tinto de verano", ingredientes: "", precio: "3,50 €" },
                    { nombre: "Blanco de verano", ingredientes: "", precio: "3,50 €" }
                ]
            },
            {
                title: "Menú de Cocktails",
                bg: "#222428",
                accent: "#fff",
                note: "Nuestros cócteles clásicos y modernos, preparados con pasión.",
                mode: "cocktail-mode",
                items: [
                    { nombre: "Combinado clásico", ingredientes: "Licores clásicos + soda", precio: "8,00 €" },
                    { nombre: "Combinado Premium", ingredientes: "Licores Premium + soda", precio: "10,00 €" },
                    { nombre: "Mojito", ingredientes: "Ron blanco, zumo limón exprimido, azúcar líquido, hierba buena, agua con gas", precio: "8,00 €" },
                    { nombre: "Mojito sabores", ingredientes: "Ron blanco, zumo limón exprimido, azúcar líquido, hierba buena, agua con gas, sirope sabor", precio: "8,50 €" },
                    { nombre: "Margarita", ingredientes: "Tequila, zumo limón exprimido, azúcar líquido", precio: "9,00 €" },
                    { nombre: "Margarita sabores", ingredientes: "Tequila, zumo limón exprimido, azúcar líquido, sirope sabor", precio: "9,50 €" },
                    { nombre: "Moscow Mule", ingredientes: "Vodka, zumo limón exprimido, ginger beer", precio: "7,00 €" },
                    { nombre: "Daiquiri", ingredientes: "Ron blanco, zumo limón exprimido, azúcar líquido", precio: "8,00 €" },
                    { nombre: "Daiquiri sabores", ingredientes: "Ron blanco, zumo limón exprimido, azúcar líquido, sirope sabor", precio: "8,50 €" },
                    { nombre: "Caipirinha", ingredientes: "Cachaça, zumo de limón exprimido, azúcar líquido, agua con gas", precio: "7,00 €" },
                    { nombre: "Tequila sunrise", ingredientes: "Tequila, zumo naranja, granadina", precio: "7,00 €" },
                    { nombre: "Negroni", ingredientes: "Ginebra, vermut, Campari", precio: "9,00 €" },
                    { nombre: "Aperol spritz", ingredientes: "Aperol, cava, agua con gas", precio: "8,50 €" },
                    { nombre: "Piña colada", ingredientes: "Zumo piña, sirope coco, hielo pilé, ron blanco", precio: "8,00 €" },
                    { nombre: "Copa", ingredientes: "De cualquier licor", precio: "5,00 €" },
                    { nombre: "Chupito", ingredientes: "De cualquier licor", precio: "3,00 €" },
                    { nombre: "Chupito la casita", ingredientes: "", precio: "4,00 €" },
                    { nombre: "Copa de vino Blanco", ingredientes: "Seco - Verdejo; Afrutado", precio: "3,70 €" },
                    { nombre: "Copa de vino tinto", ingredientes: "Rioja o tempranillo o ribera", precio: "3,70 €" }
                ]
            },
            {
                title: "Menú de Cafés",
                bg: "#fff6e3",
                accent: "#ba7b36",
                note: "Cafés y especialidades calientes para cada momento del día.",
                mode: "",
                items: [
                    { nombre: "Café Solo", ingredientes: "café", precio: "1,50 €" },
                    { nombre: "Café Americano", ingredientes: "café + agua caliente", precio: "1,60 €" },
                    { nombre: "Café cortado", ingredientes: "café + leche", precio: "1,60 €" },
                    { nombre: "Café Cortado largo", ingredientes: "café + leche", precio: "1,80 €" },
                    { nombre: "Café leche y leche", ingredientes: "café + leche + leche condensada", precio: "1,50 €" },
                    { nombre: "Café bombon", ingredientes: "café + leche condensada", precio: "1,60 €" },
                    { nombre: "Café con leche", ingredientes: "café + leche", precio: "1,90 €" },
                    { nombre: "Café irlandés", ingredientes: "café + azúcar moreno + whiskey + nata", precio: "4,00 €" },
                    { nombre: "Café affogato", ingredientes: "café + bolita de helado", precio: "3,20 €" },
                    { nombre: "Barraquito", ingredientes: "café + leche + leche condensada", precio: "2,00 €" },
                    { nombre: "Barraquito con licor", ingredientes: "café + leche + leche condensada + licor 43", precio: "2,20 €" },
                    { nombre: "Cappuccino", ingredientes: "café + leche + cacao", precio: "2,50 €" },
                    { nombre: "Cappuccino kinder", ingredientes: "café + leche + cacao + salsa chocolate", precio: "2,80 €" },
                    { nombre: "Latte macchiato", ingredientes: "café + leche", precio: "2,30 €" },
                    { nombre: "Caramel latte", ingredientes: "café + leche + sirope caramelo", precio: "2,80 €" },
                    { nombre: "Chocolate a la taza", ingredientes: "chocolate + leche", precio: "3,50 €" },
                    { nombre: "Leche con gofio", ingredientes: "leche + gofio en polvo", precio: "2,50 €" },
                    { nombre: "Té orgánico", ingredientes: "verde con flores, verde con arándanos, verde con gengibre y limón, infusión del bosque, negro chai, negro con cacao y almendras, fresa y vainilla, darjeeling", precio: "2,50 €" },
                    { nombre: "Té roibos", ingredientes: "roibos naranja, roibos dulce, manzanilla", precio: "2,80 €" }
                ]
            },
            {
                title: "Menú de Batidos",
                bg: "#efe3ff",
                accent: "#aa70d0",
                note: "Batidos frescos, cremosos y llenos de sabor.",
                mode: "",
                items: [
                    { nombre: "Oreo", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Chocolate", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Vainilla", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Fresa", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Mango", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Gofio", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Frapé de Café", ingredientes: "", precio: "4,00 €" },
                    { nombre: "Frapé de Barraquito", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Frapé de Barraquito Especial", ingredientes: "", precio: "5,00 €" },
                    { nombre: "Frapé de Bayleis", ingredientes: "", precio: "7,00 €" }
                ]
            },
            {
                title: "Menú de Smoothies",
                bg: "#d3f8e2",
                accent: "#33a475",
                note: "Smoothies naturales con frutas y verduras frescas.",
                mode: "",
                items: [
                    { nombre: "1. Berry Passion", ingredientes: "frambuesa, arándano, plátano", precio: "5,35 €" },
                    { nombre: "2. Strawberry Split", ingredientes: "fresa, cereza, plátano, papaya", precio: "5,35 €" },
                    { nombre: "3. Jump to the Beet", ingredientes: "mango, remolacha, zanahoria", precio: "5,35 €" },
                    { nombre: "4. Caribbean Kiss", ingredientes: "melón, fresa, mango, limón", precio: "5,35 €" },
                    { nombre: "5. Mango Paradise", ingredientes: "mango, piña, maracuyá, limón", precio: "5,35 €" },
                    { nombre: "6. Kiwi Cooler", ingredientes: "melón, mango, piña, kiwi", precio: "5,35 €" },
                    { nombre: "7. Papaya Sunrise", ingredientes: "papaya, mango, piña, limón", precio: "5,35 €" },
                    { nombre: "8. Tropi Colada", ingredientes: "plátano, coco, piña", precio: "5,35 €" }
                ]
            },
            {
                title: "Menú de Zumos Naturales",
                bg: "#f5ffe3",
                accent: "#9ebe40",
                note: "Zumos recién exprimidos, llenos de vitaminas.",
                mode: "",
                items: [
                    { nombre: "Limonada casera", ingredientes: "", precio: "3,50 €" },
                    { nombre: "Zumo de naranja", ingredientes: "", precio: "4,50 €" },
                    { nombre: "Zumo de fresa", ingredientes: "", precio: "5,00 €" },
                    { nombre: "Zumo de mango", ingredientes: "", precio: "5,00 €" },
                    { nombre: "Zumo de 2 frutas", ingredientes: "", precio: "8,00 €" }
                ]
            },
            {
                title: "Menú de Entrantes",
                bg: "#fffaf4",
                accent: "#2b7da9",
                note: "Pequeños placeres para empezar bien.",
                mode: "",
                items: [
                    { nombre: "Saquitos", ingredientes: "Langostino, manzana dulce, salsa teriyaki", precio: "2,90 €" },
                    { nombre: "Croqueta de pollo", ingredientes: "pollo y huancaina", precio: "1,90 €" },
                    { nombre: "Croqueta de espinaca", ingredientes: "espinacas y almogrote", precio: "1,90 €" },
                    { nombre: "Rollitos de pato", ingredientes: "pato confitado + salsa thai", precio: "11,90 €" },
                    { nombre: "Rollitos de verdura", ingredientes: "pimiento + zanahoria + salsa thai", precio: "11,60 €" },
                    { nombre: "Ensaladilla la casita", ingredientes: "batata, ventresca, cebolla, langostinos salteados en salsa teriyaki", precio: "9,10 € / 13,90 €" },
                    { nombre: "Nachos la casita", ingredientes: "totopos, salsa cheddar, pico de gallo, judias, guacamole, jalapeños", precio: "8,70 € / 13,10 €" },
                    { nombre: "Huevos rotos con Ibérico", ingredientes: "huevos + iberico + papas", precio: "14,30 €" },
                    { nombre: "Ceviche de Langostinos", ingredientes: "langostinos + leche de tigre + mango + millo + cebolla roja", precio: "14,10 €" }
                ]
            },
            {
                title: "Menú de Tostas",
                bg: "#f3f9f3",
                accent: "#438c4a",
                note: "Rebanadas creativas, sabrosas y ligeras.",
                mode: "",
                items: [
                    { nombre: "Champiñones", ingredientes: "champiñones, calabacines, cebolla caramelizada, tomate cherry", precio: "11,40 €" },
                    { nombre: "Mozzarella", ingredientes: "mozzarella, tomate seco, albahaca, aceite de oliva virgen extra", precio: "11,80 €" },
                    { nombre: "Salmón", ingredientes: "salmón ahumado, salsa tártara, arucula", precio: "12,60 €" },
                    { nombre: "Solomillo", ingredientes: "solomillo de ternera sobre una crema de pimientos dulces con cebolla caramelizada y escamas de queso", precio: "13,10 €" }
                ]
            },
            {
                title: "Menú de Ensaladas",
                bg: "#e5f5f8",
                accent: "#298da8",
                note: "Frescas, saludables y llenas de color.",
                mode: "",
                items: [
                    { nombre: "El chef", ingredientes: "ventresca, vinagreta de mango, mix de lechuga, cebolla roja, tomates cherry", precio: "12,10 €" },
                    { nombre: "La Jefa", ingredientes: "rodajas de tomate con aceite de oliva virgen, mozzarella, sal, tomillo, pan tostado", precio: "12,10 €" },
                    { nombre: "De pollo", ingredientes: "tiras de pollo crujiente, mix de lechuga, parmesano, picatostes, cebolla morada y tomates cherry, salsa cesar", precio: "13,70 €" },
                    { nombre: "Ensalada Thai", ingredientes: "langostinos, mix de lechuga, tomates cherry, fideos de arroz, cacahuetes, cebolla morada, vinagreta agripicante", precio: "14,10 €" },
                    { nombre: "Ensalada ahumados", ingredientes: "salmón, atun, pez mantequilla ahumados, mix de lechugas, tomate cherry, cebolla, vinagreta de limon y cilantros", precio: "14,80 €" }
                ]
            },
            {
                title: "Menú de Burgers",
                bg: "#fdf2e9",
                accent: "#b3541e",
                note: "Jugosas y caseras, hechas con amor.",
                mode: "",
                items: [
                    { nombre: "Calabacín", ingredientes: "calabacin empanado en frutos secos, rucula, tomates secos, mayonesa de wasabi, cebolla caramelizada, papas fritas", precio: "13,10 €" },
                    { nombre: "Ternera", ingredientes: "ternera 170gr, pimiento piquillo, rucula, cebolla caramelizada, mayonesa de eneldo, papas fritas", precio: "14,10 €" },
                    { nombre: "Tradicional", ingredientes: "ternera 170gr, cebolla morada, mix de lechuga, tomate natural, alioli casero, papas fritas", precio: "13,50 €" },
                    { nombre: "de Pollo", ingredientes: "pollo de corral crujiente, cebolla morada, mix de lechuga, tomate natural, alioli casero, papas fritas", precio: "13,30 €" }
                ]
            },
            {
                title: "Menú de Wok",
                bg: "#f9f6f1",
                accent: "#8d4c96",
                note: "Salteados al momento, fusión de sabores.",
                mode: "",
                items: [
                    { nombre: "Verduras", ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz", precio: "13,80 €" },
                    { nombre: "Pollo", ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, pollo crujiente", precio: "14,20 €" },
                    { nombre: "Langostinos", ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, langostino salteado en salsa teriyaki", precio: "14,70 €" },
                    { nombre: "Ternera", ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, solomillo de ternera", precio: "15,10 €" }
                ]
            },
            {
                title: "Menú de Platos de carne",
                bg: "#fae5e9",
                accent: "#aa2d45",
                note: "Sabores intensos y texturas únicas.",
                mode: "",
                items: [
                    { nombre: "Huevos rotos con Ibérico", ingredientes: "huevos + iberico + papas", precio: "14,30 €" },
                    { nombre: "Ternera Anticucho", ingredientes: "ternera salteada en salsa anticucho, papas negras, tomate cherry, manzana", precio: "15,90 €" },
                    { nombre: "Arroz frito con ternera", ingredientes: "arroz frito, verduras salteadas, ternera, salsa de ostras, aceite de sésamo, huevo frito", precio: "14,60 €" },
                    { nombre: "Poke bowl mexicano", ingredientes: "arroz basmati, pollo de corral marinado en chipotle, pico de gallo, guacamole, frijoles negros, cilantro, chips de plátano", precio: "13,70 €" },
                    { nombre: "Opción infantil", ingredientes: "pollo crujiente, papas fritas", precio: "12,90 €" }
                ]
            },
            {
                title: "Menú de Tartas",
                bg: "#b4a7d6",
                accent: "#6a329f",
                note: "Sabores dulces y texturas suaves.",
                mode: "",
                items: [
                    { nombre: "Tarta Maria Victoria", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Guinness", ingredientes: "queso crema, galletas, mantequilla, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Baileys", ingredientes: "frutas de temporada, crema pastelera, masa quebrada", precio: "4,50 €" },
                    { nombre: "Tarta Choco Velvet", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Red Velvet", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Blue Velvet", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Ferrero", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Kinder", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Zanahoria y Especias", ingredientes: "zanahoria, nuez, canela, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Calabaza y Especias", ingredientes: "calabaza, nuez, canela, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Gofio y Naranja", ingredientes: "gofio, naranja, canela, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Manzana", ingredientes: "manzana, canela, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Maracuyá", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Yuzu", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta Colibrí", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de ChocoFrambuesa", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Tarta de Oreo", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Cheese Cake", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" },
                    { nombre: "Pie de Calabaza", ingredientes: "chocolate, harina, huevos, azúcar", precio: "4,50 €" }
                ]
            }
        ];

        let currentMenu = 0;
        const menuTitle = document.getElementById("menuTitle");
        const menuTable = document.getElementById("menuTable");
        const menuNote = document.getElementById("menuNote");
        const menuIndicator = document.getElementById("menuIndicator");
        const menuContainer = document.getElementById("menuContainer");

        function renderMenu(idx) {
            const m = menus[idx];
            
            // Cambia sfondo
            document.body.style.background = m.bg;
            
            // Cambia classe per cocktail mode
            menuContainer.classList.remove("cocktail-mode", "menu-mode");
            menuContainer.classList.add(m.mode || "menu-mode");
            
            // Titolo + slide effetto
            menuTitle.textContent = m.title;
            menuTitle.style.color = m.accent;
            menuTitle.classList.remove("slide-in");
            void menuTitle.offsetWidth; // restart animation
            menuTitle.classList.add("slide-in");
            
            // Nota
            menuNote.textContent = m.note;
            menuNote.style.color = m.mode ? "#fff" : "#548dd3";
            
            // Costruisci tabella
            const categoryHeader = m.title || "Categoría";
            let html = `
                <thead>
                    <tr>
                        <th>${categoryHeader}</th>
                        <th class="price">Precio</th>
                    </tr>
                </thead>
                <tbody>
            `;
            
            for (const row of m.items) {
                html += `<tr>
                    <td>${row.nombre}${row.ingredientes ? `<span class="ingredientes">${row.ingredientes}</span>` : ""}</td>
                    <td class="price">${row.precio}</td>
                </tr>`;
            }
            
            html += "</tbody>";
            menuTable.innerHTML = html;
            
            // Indicatore menu
            menuIndicator.textContent = `${idx+1} / ${menus.length}`;
        }

        document.getElementById("prevBtn").onclick = function(){
            currentMenu = (currentMenu - 1 + menus.length) % menus.length;
            renderMenu(currentMenu);
        };
        
        document.getElementById("nextBtn").onclick = function(){
            currentMenu = (currentMenu + 1) % menus.length;
            renderMenu(currentMenu);
        };

        // Swipe touch per mobile
        let xStart = null;
        menuTable.addEventListener('touchstart', function(e){
            xStart = e.touches[0].clientX;
        });
        
        menuTable.addEventListener('touchend', function(e){
            if(xStart == null) return;
            let xEnd = e.changedTouches[0].clientX;
            if(xEnd - xStart > 40) document.getElementById("prevBtn").click();
            if(xStart - xEnd > 40) document.getElementById("nextBtn").click();
            xStart = null;
        });

        // Funzione placeholder per setLanguage
        function setLanguage(lang) {
            console.log('Language selected:', lang);
            // Qui puoi implementare la logica per cambiare lingua
        }

        // Inizializzazione
        window.onload = () => {
            renderMenu(currentMenu);
        };