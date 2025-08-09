const menus = [
            {
                title: { i18nKey: "menu_bebidas_title", default: "Menú de Bebidas" },
                bg: "#f4fbff",
                accent: "#2b7da9",
                note: { i18nKey: "menu_bebidas_note", default: "Refrescos, aguas y bebidas para todos los gustos." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_bebidas_agua_peq", default: "Agua Pequeña" }, ingredientes: { i18nKey: "menu_bebidas_agua_peq_ing", default: "" }, precio: "1,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_agua_grande", default: "Agua Grande" }, ingredientes: { i18nKey: "menu_bebidas_agua_grande_ing", default: "" }, precio: "2,60 €" },
                    { nombre: { i18nKey: "menu_bebidas_agua_peq_gas", default: "Agua Pequeña con Gas" }, ingredientes: { i18nKey: "menu_bebidas_agua_peq_gas_ing", default: "" }, precio: "1,70 €" },
                    { nombre: { i18nKey: "menu_bebidas_agua_grande_gas", default: "Agua Grande con Gas" }, ingredientes: { i18nKey: "menu_bebidas_agua_grande_gas_ing", default: "" }, precio: "2,60 €" },
                    { nombre: { i18nKey: "menu_bebidas_refrescos", default: "Refrescos" }, ingredientes: { i18nKey: "menu_bebidas_refrescos_ing", default: "" }, precio: "2,60 €" },
                    { nombre: { i18nKey: "menu_bebidas_appletiser", default: "Appletiser" }, ingredientes: { i18nKey: "menu_bebidas_appletiser_ing", default: "" }, precio: "2,00 €" },
                    { nombre: { i18nKey: "menu_bebidas_tonica", default: "Tónica" }, ingredientes: { i18nKey: "menu_bebidas_tonica_ing", default: "" }, precio: "1,60 €" },
                    { nombre: { i18nKey: "menu_bebidas_tonica_fresa", default: "Tónica de fresa" }, ingredientes: { i18nKey: "menu_bebidas_tonica_fresa_ing", default: "" }, precio: "1,70 €" },
                    { nombre: { i18nKey: "menu_bebidas_ginger_ale", default: "Ginger ale - ginger beer" }, ingredientes: { i18nKey: "menu_bebidas_ginger_ale_ing", default: "" }, precio: "2,00 €" },
                    { nombre: { i18nKey: "menu_bebidas_cana", default: "Caña" }, ingredientes: { i18nKey: "menu_bebidas_cana_ing", default: "" }, precio: "1,80 €" },
                    { nombre: { i18nKey: "menu_bebidas_jarra", default: "Jarra" }, ingredientes: { i18nKey: "menu_bebidas_jarra_ing", default: "" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_dorada_pilsen", default: "Dorada pilsen" }, ingredientes: { i18nKey: "menu_bebidas_dorada_pilsen_ing", default: "" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_dorada_especial", default: "Dorada especial" }, ingredientes: { i18nKey: "menu_bebidas_dorada_especial_ing", default: "" }, precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_bebidas_dorada_tostada", default: "Dorada tostada" }, ingredientes: { i18nKey: "menu_bebidas_dorada_tostada_ing", default: "" }, precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_bebidas_dorada_sin_limon", default: "Dorada sin con limon" }, ingredientes: { i18nKey: "menu_bebidas_dorada_sin_limon_ing", default: "" }, precio: "2,70 €" },
                    { nombre: { i18nKey: "menu_bebidas_dorada_sin_alcohol", default: "Dorada sin alcohol" }, ingredientes: { i18nKey: "menu_bebidas_dorada_sin_alcohol_ing", default: "" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_corona", default: "Corona" }, ingredientes: { i18nKey: "menu_bebidas_corona_ing", default: "" }, precio: "3,00 €" },
                    { nombre: { i18nKey: "menu_bebidas_sidra_kopparberg", default: "Sidra Kopparberg" }, ingredientes: { i18nKey: "menu_bebidas_sidra_kopparberg_ing", default: "" }, precio: "3,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_tinto_verano", default: "Tinto de verano" }, ingredientes: { i18nKey: "menu_bebidas_tinto_verano_ing", default: "" }, precio: "3,50 €" },
                    { nombre: { i18nKey: "menu_bebidas_blanco_verano", default: "Blanco de verano" }, ingredientes: { i18nKey: "menu_bebidas_blanco_verano_ing", default: "" }, precio: "3,50 €" }
                ]
            },
            {
                title: { i18nKey: "menu_cocktails_title", default: "Menú de Cocktails" },
                bg: "#222428",
                accent: "#fff",
                note: { i18nKey: "menu_cocktails_note", default: "Nuestros cócteles clásicos y modernos, preparados con pasión." },
                mode: "cocktail-mode",
                items: [
                    { nombre: { i18nKey: "menu_cocktails_combinado_clasico", default: "Combinado clásico" }, ingredientes: { i18nKey: "menu_cocktails_combinado_clasico_ing", default: "Licores clásicos + soda" }, precio: "8,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_combinado_premium", default: "Combinado Premium" }, ingredientes: { i18nKey: "menu_cocktails_combinado_premium_ing", default: "Licores Premium + soda" }, precio: "10,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_mojito", default: "Mojito" }, ingredientes: { i18nKey: "menu_cocktails_mojito_ing", default: "Ron blanco, zumo limón exprimido, azúcar líquido, hierba buena, agua con gas" }, precio: "8,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_mojito_sabores", default: "Mojito sabores" }, ingredientes: { i18nKey: "menu_cocktails_mojito_sabores_ing", default: "Ron blanco, zumo limón exprimido, azúcar líquido, hierba buena, agua con gas, sirope sabor" }, precio: "8,50 €" },
                    { nombre: { i18nKey: "menu_cocktails_margarita", default: "Margarita" }, ingredientes: { i18nKey: "menu_cocktails_margarita_ing", default: "Tequila, zumo limón exprimido, azúcar líquido" }, precio: "9,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_margarita_sabores", default: "Margarita sabores" }, ingredientes: { i18nKey: "menu_cocktails_margarita_sabores_ing", default: "Tequila, zumo limón exprimido, azúcar líquido, sirope sabor" }, precio: "9,50 €" },
                    { nombre: { i18nKey: "menu_cocktails_moscow_mule", default: "Moscow Mule" }, ingredientes: { i18nKey: "menu_cocktails_moscow_mule_ing", default: "Vodka, zumo limón exprimido, ginger beer" }, precio: "7,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_daiquiri", default: "Daiquiri" }, ingredientes: { i18nKey: "menu_cocktails_daiquiri_ing", default: "Ron blanco, zumo limón exprimido, azúcar líquido" }, precio: "8,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_daiquiri_sabores", default: "Daiquiri sabores" }, ingredientes: { i18nKey: "menu_cocktails_daiquiri_sabores_ing", default: "Ron blanco, zumo limón exprimido, azúcar líquido, sirope sabor" }, precio: "8,50 €" },
                    { nombre: { i18nKey: "menu_cocktails_caipirinha", default: "Caipirinha" }, ingredientes: { i18nKey: "menu_cocktails_caipirinha_ing", default: "Cachaça, zumo de limón exprimido, azúcar líquido, agua con gas" }, precio: "7,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_tequila_sunrise", default: "Tequila sunrise" }, ingredientes: { i18nKey: "menu_cocktails_tequila_sunrise_ing", default: "Tequila, zumo naranja, granadina" }, precio: "7,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_negroni", default: "Negroni" }, ingredientes: { i18nKey: "menu_cocktails_negroni_ing", default: "Ginebra, vermut, Campari" }, precio: "9,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_aperol_spritz", default: "Aperol spritz" }, ingredientes: { i18nKey: "menu_cocktails_aperol_spritz_ing", default: "Aperol, cava, agua con gas" }, precio: "8,50 €" },
                    { nombre: { i18nKey: "menu_cocktails_pina_colada", default: "Piña colada" }, ingredientes: { i18nKey: "menu_cocktails_pina_colada_ing", default: "Zumo piña, sirope coco, hielo pilé, ron blanco" }, precio: "8,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_copa", default: "Copa" }, ingredientes: { i18nKey: "menu_cocktails_copa_ing", default: "De cualquier licor" }, precio: "5,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_chupito", default: "Chupito" }, ingredientes: { i18nKey: "menu_cocktails_chupito_ing", default: "De cualquier licor" }, precio: "3,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_chupito_la_casita", default: "Chupito la casita" }, ingredientes: { i18nKey: "menu_cocktails_chupito_la_casita_ing", default: "" }, precio: "4,00 €" },
                    { nombre: { i18nKey: "menu_cocktails_copa_vino_blanco", default: "Copa de vino Blanco" }, ingredientes: { i18nKey: "menu_cocktails_copa_vino_blanco_ing", default: "Seco - Verdejo; Afrutado" }, precio: "3,70 €" },
                    { nombre: { i18nKey: "menu_cocktails_copa_vino_tinto", default: "Copa de vino tinto" }, ingredientes: { i18nKey: "menu_cocktails_copa_vino_tinto_ing", default: "Rioja o tempranillo o ribera" }, precio: "3,70 €" }
                ]
            },
            {
                title: { i18nKey: "menu_cafes", default: "Menú de Cafés" },
                bg: "#fff6e3",
                accent: "#ba7b36",
                note: { i18nKey: "menu_cafes_nota", default: "Cafés y especialidades calientes para cada momento del día." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_cafes_cafe_solo", default: "Café Solo" }, ingredientes: { i18nKey: "menu_cafes_cafe_solo_ing", default: "café" }, precio: "1,50 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_americano", default: "Café Americano" }, ingredientes: { i18nKey: "menu_cafes_cafe_americano_ing", default: "café + agua caliente" }, precio: "1,60 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_cortado", default: "Café cortado" }, ingredientes: { i18nKey: "menu_cafes_cafe_cortado_ing", default: "café + leche" }, precio: "1,60 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_cortado_largo", default: "Café Cortado largo" }, ingredientes: { i18nKey: "menu_cafes_cafe_cortado_largo_ing", default: "café + leche" }, precio: "1,80 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_leche_y_leche", default: "Café leche y leche" }, ingredientes: { i18nKey: "menu_cafes_cafe_leche_y_leche_ing", default: "café + leche + leche condensada" }, precio: "1,50 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_bombon", default: "Café bombon" }, ingredientes: { i18nKey: "menu_cafes_cafe_bombon_ing", default: "café + leche condensada" }, precio: "1,60 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_con_leche", default: "Café con leche" }, ingredientes: { i18nKey: "menu_cafes_cafe_con_leche_ing", default: "café + leche" }, precio: "1,90 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_irlandes", default: "Café irlandés" }, ingredientes: { i18nKey: "menu_cafes_cafe_irlandes_ing", default: "café + azúcar moreno + whiskey + nata" }, precio: "4,00 €" },
                    { nombre: { i18nKey: "menu_cafes_cafe_affogato", default: "Café affogato" }, ingredientes: { i18nKey: "menu_cafes_cafe_affogato_ing", default: "café + bolita de helado" }, precio: "3,20 €" },
                    { nombre: { i18nKey: "menu_cafes_barraquito", default: "Barraquito" }, ingredientes: { i18nKey: "menu_cafes_barraquito_ing", default: "café + leche + leche condensada" }, precio: "2,00 €" },
                    { nombre: { i18nKey: "menu_cafes_barraquito_con_licor", default: "Barraquito con licor" }, ingredientes: { i18nKey: "menu_cafes_barraquito_con_licor_ing", default: "café + leche + leche condensada + licor 43" }, precio: "2,20 €" },
                    { nombre: { i18nKey: "menu_cafes_cappuccino", default: "Cappuccino" }, ingredientes: { i18nKey: "menu_cafes_cappuccino_ing", default: "café + leche + cacao" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cafes_cappuccino_kinder", default: "Cappuccino kinder" }, ingredientes: { i18nKey: "menu_cafes_cappuccino_kinder_ing", default: "café + leche + cacao + salsa chocolate" }, precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_cafes_latte_macchiato", default: "Latte macchiato" }, ingredientes: { i18nKey: "menu_cafes_latte_macchiato_ing", default: "café + leche" }, precio: "2,30 €" },
                    { nombre: { i18nKey: "menu_cafes_caramel_latte", default: "Caramel latte" }, ingredientes: { i18nKey: "menu_cafes_caramel_latte_ing", default: "café + leche + sirope caramelo" }, precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_cafes_chocolate_a_la_taza", default: "Chocolate a la taza" }, ingredientes: { i18nKey: "menu_cafes_chocolate_a_la_taza_ing", default: "chocolate + leche" }, precio: "3,50 €" },
                    { nombre: { i18nKey: "menu_cafes_leche_con_gofio", default: "Leche con gofio" }, ingredientes: { i18nKey: "menu_cafes_leche_con_gofio_ing", default: "leche + gofio en polvo" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cafes_te_organico", default: "Té orgánico" }, ingredientes: { i18nKey: "menu_cafes_te_organico_ing", default: "verde con flores, verde con arándanos, verde con gengibre y limón, infusión del bosque, negro chai, negro con cacao y almendras, fresa y vainilla, darjeeling" }, precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cafes_te_roibos", default: "Té roibos" }, ingredientes: { i18nKey: "menu_cafes_te_roibos_ing", default: "roibos naranja, roibos dulce, manzanilla" }, precio: "2,80 €" }
                ]
            },
            {
                title: { i18nKey: "menu_batidos_titulo", default: "Menú de Batidos" },
                bg: "#efe3ff",
                accent: "#aa70d0",
                note: { i18nKey: "menu_batidos_nota", default: "Batidos frescos, cremosos y llenos de sabor." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_batidos_oreo", default: "Oreo" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_chocolate", default: "Chocolate" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_vainilla", default: "Vainilla" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_fresa", default: "Fresa" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_mango", default: "Mango" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_gofio", default: "Gofio" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_frape_cafe", default: "Frapé de Café" }, ingredientes: {}, precio: "4,00 €" },
                    { nombre: { i18nKey: "menu_batidos_frape_barraquito", default: "Frapé de Barraquito" }, ingredientes: {}, precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_batidos_frape_barraquito_especial", default: "Frapé de Barraquito Especial" }, ingredientes: {}, precio: "5,00 €" },
                    { nombre: { i18nKey: "menu_batidos_frape_bayleis", default: "Frapé de Bayleis" }, ingredientes: {}, precio: "7,00 €" }
                ]
            },
            {
                title: { i18nKey: "menu_smoothies_titulo", default: "Menú de Smoothies" },
                bg: "#d3f8e2",
                accent: "#33a475",
                note: { i18nKey: "menu_smoothies_nota", default: "Smoothies naturales con frutas y verduras frescas." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_smoothies_berry_passion", default: "1. Berry Passion" }, ingredientes: "frambuesa, arándano, plátano", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_strawberry_split", default: "2. Strawberry Split" }, ingredientes: "fresa, cereza, plátano, papaya", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_jump_to_the_beet", default: "3. Jump to the Beet" }, ingredientes: "mango, remolacha, zanahoria", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_caribbean_kiss", default: "4. Caribbean Kiss" }, ingredientes: "melón, fresa, mango, limón", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_mango_paradise", default: "5. Mango Paradise" }, ingredientes: "mango, piña, maracuyá, limón", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_kiwi_cooler", default: "6. Kiwi Cooler" }, ingredientes: "melón, mango, piña, kiwi", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_papaya_sunrise", default: "7. Papaya Sunrise" }, ingredientes: "papaya, mango, piña, limón", precio: "5,35 €" },
                    { nombre: { i18nKey: "menu_smoothies_tropi_colada", default: "8. Tropi Colada" }, ingredientes: "plátano, coco, piña", precio: "5,35 €" }
                ]
            },
            {
                title: { i18nKey: "menu_zumos_naturales_titulo", default: "Menú de Zumos Naturales" },
                bg: "#f5ffe3",
                accent: "#9ebe40",
                note: { i18nKey: "menu_zumos_naturales_nota", default: "Zumos recién exprimidos, llenos de vitaminas." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_zumos_naturales_limonada_casera", default: "Limonada casera" }, ingredientes: "", precio: "3,50 €" },
                    { nombre: { i18nKey: "menu_zumos_naturales_zumo_de_naranja", default: "Zumo de naranja" }, ingredientes: "", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_zumos_naturales_zumo_de_fresa", default: "Zumo de fresa" }, ingredientes: "", precio: "5,00 €" },
                    { nombre: { i18nKey: "menu_zumos_naturales_zumo_de_mango", default: "Zumo de mango" }, ingredientes: "", precio: "5,00 €" },
                    { nombre: { i18nKey: "menu_zumos_naturales_zumo_de_dos_frutas", default: "Zumo de 2 frutas" }, ingredientes: "", precio: "8,00 €" }
                ]
            },
            {
                title: { i18nKey: "menu_entrantes_titulo", default: "Menú de Entrantes" },
                bg: "#fffaf4",
                accent: "#2b7da9",
                note: { i18nKey: "menu_entrantes_nota", default: "Pequeños placeres para empezar bien." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_entrantes_saquitos", default: "Saquitos" }, ingredientes: "Langostino, manzana dulce, salsa teriyaki", precio: "2,90 €" },
                    { nombre: { i18nKey: "menu_entrantes_croqueta_de_pollo", default: "Croqueta de pollo" }, ingredientes: "pollo y huancaina", precio: "1,90 €" },
                    { nombre: { i18nKey: "menu_entrantes_croqueta_de_espinaca", default: "Croqueta de espinaca" }, ingredientes: "espinacas y almogrote", precio: "1,90 €" },
                    { nombre: { i18nKey: "menu_entrantes_rollitos_de_pato", default: "Rollitos de pato" }, ingredientes: "pato confitado + salsa thai", precio: "11,90 €" },
                    { nombre: { i18nKey: "menu_entrantes_rollitos_de_verdura", default: "Rollitos de verdura" }, ingredientes: "pimiento + zanahoria + salsa thai", precio: "11,60 €" },
                    { nombre: { i18nKey: "menu_entrantes_ensaladilla_la_casita", default: "Ensaladilla la casita" }, ingredientes: "batata, ventresca, cebolla, langostinos salteados en salsa teriyaki", precio: "9,10 € / 13,90 €" },
                    { nombre: { i18nKey: "menu_entrantes_nachos_la_casita", default: "Nachos la casita" }, ingredientes: "totopos, salsa cheddar, pico de gallo, judias, guacamole, jalapeños", precio: "8,70 € / 13,10 €" },
                    { nombre: { i18nKey: "menu_entrantes_huevos_rotos_con_iberico", default: "Huevos rotos con Ibérico" }, ingredientes: "huevos + iberico + papas", precio: "14,30 €" },
                    { nombre: { i18nKey: "menu_entrantes_ceviche_de_langostinos", default: "Ceviche de Langostinos" }, ingredientes: "langostinos + leche de tigre + mango + millo + cebolla roja", precio: "14,10 €" }
                ]
            },
            {
                title: { i18nKey: "menu_tostas", default: "Menú de Tostas" },
                bg: "#f3f9f3",
                accent: "#438c4a",
                note: { i18nKey: "menu_tostas_nota", default: "Rebanadas creativas, sabrosas y ligeras." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_tostas_champinones", default: "Champiñones" }, ingredientes: "champiñones, calabacines, cebolla caramelizada, tomate cherry", precio: "11,40 €" },
                    { nombre: { i18nKey: "menu_tostas_mozzarella", default: "Mozzarella" }, ingredientes: "mozzarella, tomate seco, albahaca, aceite de oliva virgen extra", precio: "11,80 €" },
                    { nombre: { i18nKey: "menu_tostas_salmon", default: "Salmón" }, ingredientes: "salmón ahumado, salsa tártara, arucula", precio: "12,60 €" },
                    { nombre: { i18nKey: "menu_tostas_solomillo", default: "Solomillo" }, ingredientes: "solomillo de ternera sobre una crema de pimientos dulces con cebolla caramelizada y escamas de queso", precio: "13,10 €" }
                ]
            },
            {
                title: { i18nKey: "menu_ensaladas", default: "Menú de Ensaladas" },
                bg: "#e5f5f8",
                accent: "#298da8",
                note: { i18nKey: "menu_ensaladas_nota", default: "Frescas, saludables y llenas de color." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_ensaladas_el_chef", default: "El chef" }, ingredientes: "ventresca, vinagreta de mango, mix de lechuga, cebolla roja, tomates cherry", precio: "12,10 €" },
                    { nombre: { i18nKey: "menu_ensaladas_la_jefa", default: "La Jefa" }, ingredientes: "rodajas de tomate con aceite de oliva virgen, mozzarella, sal, tomillo, pan tostado", precio: "12,10 €" },
                    { nombre: { i18nKey: "menu_ensaladas_de_pollo", default: "De pollo" }, ingredientes: "tiras de pollo crujiente, mix de lechuga, parmesano, picatostes, cebolla morada y tomates cherry, salsa cesar", precio: "13,70 €" },
                    { nombre: { i18nKey: "menu_ensaladas_thai", default: "Ensalada Thai" }, ingredientes: "langostinos, mix de lechuga, tomates cherry, fideos de arroz, cacahuetes, cebolla morada, vinagreta agripicante", precio: "14,10 €" },
                    { nombre: { i18nKey: "menu_ensaladas_ahumados", default: "Ensalada ahumados" }, ingredientes: "salmón, atun, pez mantequilla ahumados, mix de lechugas, tomate cherry, cebolla, vinagreta de limon y cilantros", precio: "14,80 €" }
                ]
            },
            {
                title: { i18nKey: "menu_burgers", default: "Menú de Burgers" },
                bg: "#fdf2e9",
                accent: "#b3541e",
                note: { i18nKey: "menu_burgers_nota", default: "Jugosas y caseras, hechas con amor." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_burgers_calabacin", default: "Calabacín" }, ingredientes: "calabacin empanado en frutos secos, rucula, tomates secos, mayonesa de wasabi, cebolla caramelizada, papas fritas", precio: "13,10 €" },
                    { nombre: { i18nKey: "menu_burgers_ternera", default: "Ternera" }, ingredientes: "ternera 170gr, pimiento piquillo, rucula, cebolla caramelizada, mayonesa de eneldo, papas fritas", precio: "14,10 €" },
                    { nombre: { i18nKey: "menu_burgers_tradicional", default: "Tradicional" }, ingredientes: "ternera 170gr, cebolla morada, mix de lechuga, tomate natural, alioli casero, papas fritas", precio: "13,50 €" },
                    { nombre: { i18nKey: "menu_burgers_de_pollo", default: "de Pollo" }, ingredientes: "pollo de corral crujiente, cebolla morada, mix de lechuga, tomate natural, alioli casero, papas fritas", precio: "13,30 €" }
                ]
            },
            {
                title: { i18nKey: "menu_wok", default: "Menú de Wok" },
                bg: "#f9f6f1",
                accent: "#8d4c96",
                note: { i18nKey: "menu_wok_nota", default: "Salteados al momento, fusión de sabores." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_wok_verduras", default: "Verduras" }, ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz", precio: "13,80 €" },
                    { nombre: { i18nKey: "menu_wok_pollo", default: "Pollo" }, ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, pollo crujiente", precio: "14,20 €" },
                    { nombre: { i18nKey: "menu_wok_langostinos", default: "Langostinos" }, ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, langostino salteado en salsa teriyaki", precio: "14,70 €" },
                    { nombre: { i18nKey: "menu_wok_ternera", default: "Ternera" }, ingredientes: "salteado de verduras, salsa teriyaki, noodles de arroz, solomillo de ternera", precio: "15,10 €" }
                ]
            },
            {
                title: { i18nKey: "menu_platos_carne", default: "Menú de Platos de carne" },
                bg: "#fae5e9",
                accent: "#aa2d45",
                note: { i18nKey: "menu_platos_carne_nota", default: "Sabores intensos y texturas únicas." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_platos_carne_huevos_rotos", default: "Huevos rotos con Ibérico" }, ingredientes: "huevos + iberico + papas", precio: "14,30 €" },
                    { nombre: { i18nKey: "menu_platos_carne_ternera_anticucho", default: "Ternera Anticucho" }, ingredientes: "ternera salteada en salsa anticucho, papas negras, tomate cherry, manzana", precio: "15,90 €" },
                    { nombre: { i18nKey: "menu_platos_carne_arroz_frito", default: "Arroz frito con ternera" }, ingredientes: "arroz frito, verduras salteadas, ternera, salsa de ostras, aceite de sésamo, huevo frito", precio: "14,60 €" },
                    { nombre: { i18nKey: "menu_platos_carne_poke_bowl", default: "Poke bowl mexicano" }, ingredientes: "arroz basmati, pollo de corral marinado en chipotle, pico de gallo, guacamole, frijoles negros, cilantro, chips de plátano", precio: "13,70 €" },
                    { nombre: { i18nKey: "menu_platos_carne_opcion_infantil", default: "Opción infantil" }, ingredientes: "pollo crujiente, papas fritas", precio: "12,90 €" }
                ]
            },
            {
                title: { i18nKey: "menu_tartas", default: "Menú de Tartas" },
                bg: "#b4a7d6",
                accent: "#6a329f",
                note: { i18nKey: "menu_tartas_nota", default: "Sabores dulces y texturas suaves." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_tartas_maria_victoria", default: "Tarta Maria Victoria" }, ingredientes: "Fondo de Galleta, custard de limón, merenque flambeado", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_guinness", default: "Tarta Guinness" }, ingredientes: "bizcocho de cacao 70% y cerveza Guinness, crema de queso, nata dulce", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_baileys", default: "Tarta Baileys" }, ingredientes: "bizcocho de Baileys, crema de queso, chocolate y cafe", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_choco_velvet", default: "Tarta Choco Velvet" }, ingredientes: "bizcocho de chocolate, crema de queso y chocolate blanco, chocolate negro", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_red_velvet", default: "Tarta Red Velvet" }, ingredientes: "bizcocho de chocolate y red velvet, crema de queso y chocolate blanco", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_blue_velvet", default: "Tarta Blue Velvet" }, ingredientes: "bizcocho de chocolate y blue velvet, crema de queso y chocolate blanco", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_ferrero", default: "Tarta Ferrero" }, ingredientes: "bizcocho de chocolate, crema de queso y avellanas, avellanas trituradas", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_kinder", default: "Tarta Kinder" }, ingredientes: "bizcocho de chocolate, crema de queso y chocolate blanco, trozos de kinder", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_zanahoria", default: "Tarta Zanahoria y Especias" }, ingredientes: "bizcocho de zanahoria, especias, crema de queso", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_calabaza", default: "Tarta de Calabaza y Especias" }, ingredientes: "bizcocho de calabaza, nuez, crema de queso", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_gofio", default: "Tarta de Gofio y Naranja" }, ingredientes: "bizcocho de gofio, naranja, crema de queso y gofio", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_manzana", default: "Tarta de Manzana" }, ingredientes: "bizcocho de manzana, canela, crema de queso", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_maracuya", default: "Tarta de Maracuyá" }, ingredientes: "bizcocho de maracuyá, crema de queso y maracuyá", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_yuzu", default: "Tarta de Yuzu" }, ingredientes: "bizcocho de yuzu, crema de queso y yuzu", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_colibri", default: "Tarta Colibrí" }, ingredientes: "bizcocho de piña, platano y nueces, crema de queso y coco, coco rallado", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_chocoframuesa", default: "Tarta de ChocoFrambuesa" }, ingredientes: "bizcocho de cacao 70%, crema de queso y frambuesa", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_oreo", default: "Tarta de Oreo" }, ingredientes: "bizcocho de cacao 70%, crema de queso y galletas Oreo", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_cheesecake", default: "Cheese Cake" }, ingredientes: "tarta de queso, bola de helado vainilla", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_tartas_pistacho", default: "Pie de Pistacho" }, ingredientes: "fondo de galleta, mousse de pistacho, crema de queso, chocolate", precio: "4,50 €" },
                    { nombre: { i18nKey: "menu_bizcochon", default: "Angel's food" }, ingredientes: "bizcocho de vainilla, clara de huevo, azúcar", precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_bizcochon_coco", default: "Bizcochón de coco" }, ingredientes: "Bizcocho de coco, clara de huevo, azúcar", precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_cookie_platano", default: "Cookie de gotas de chocolate" }, ingredientes: "Platano, avena, gotas de chocolate", precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cookie_red_velvet", default: "Cookie Red Velvet" }, ingredientes: "cookie de chocolate y red velvet", precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cookie_choco", default: "Cookie de Chocolate" }, ingredientes: "cookie de chocolate 70% y gotas de chocolate", precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cookie_pistacho", default: "Cookie de Pistacho" }, ingredientes: "cookie de pistacho y chocolate blanco", precio: "2,50 €" },
                    { nombre: { i18nKey: "menu_cinnamon", default: "Cinnamon Roll" }, ingredientes: "Rollito dulce de masa esponjosa, relleno de canela y azúcar, cubierto con glaseado.", precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_brownie_choco", default: "Brownie de Chocolate" }, ingredientes: "Brownie de chocolate intenso, con textura jugosa y corazón fundente.", precio: "2,80 €" },
                    { nombre: { i18nKey: "menu_brownie_blanco", default: "Brownie de Chocolate Blanco" }, ingredientes: "Brownie de chocolate blanco, con textura cremosa y sabor suave.", precio: "2,80 €" }
                ]
            },
            {
                title: { i18nKey: "menu_bocatas", default: "Menú de Pulguitas/Bocadillos" },
                bg: "#daba90ff",
                accent: "#685b12ff",
                note: { i18nKey: "menu_bocatas_nota", default: "Bocados rápidos, frescos y llenos de sabor." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_boc_del_chef", default: "DEL CHEF" }, ingredientes: "lomo, mostaza, jamón, queso", precio: "2,50 € / 3,50 €"},
                    { nombre: { i18nKey: "menu_boc_de_pata", default: "DE PATA" }, ingredientes: "pata, pimiento confitado, rucula, cebollla roja, aceite de albahaca", precio: "2,50 € / 3,80 €" },
                    { nombre: { i18nKey: "menu_tartas_baileys", default: "STEAK HOUSE" }, ingredientes: "ternera desmenuzada, salsa barbacoa, queso", precio: "2,80 € / 4,00 €" },
                    { nombre: { i18nKey: "menu_tartas_pie_calabaza", default: "TORTILLA" }, ingredientes: "tortilla de patata, lechuga, tomate, mayonesa", precio: "2,80 € / 4,00 €" }
                ]
            },
            {
                title: { i18nKey: "menu_otros_desayuno", default: "Menú de Sandwiches / Tostas / Desayunos" },
                bg: "#b4a7d6",
                accent: "#6a329f",
                note: { i18nKey: "menu_desayunos_nota", default: "Desayunos que despiertan tus mañanas." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_sand_siempre", default: "Sandwich el de siempre" }, ingredientes: "jamón, queso", precio: "3,20 €" },
                    { nombre: { i18nKey: "menu_sand_clasico", default: "Sandwich Clásico" }, ingredientes: "pollo desmenuzado, mayonesa, tomate, lechuga, queso", precio: "3,60 €" },
                    { nombre: { i18nKey: "menu_sand_casita", default: "Sandwich La Casita" }, ingredientes: "pastrami, salsa tartara, pepinillo, queso", precio: "3,80 €" },
                    { nombre: { i18nKey: "menu_tosta_tumaquin", default: "Tosta Tumaquin" }, ingredientes: "tomate, jamón serrano, rúcula", precio: "3,40 €" },
                    { nombre: { i18nKey: "menu_tosta_campestre", default: "Tosta Campestre" }, ingredientes: "calabacín, queso curado , miel", precio: "3,30 €" },
                    { nombre: { i18nKey: "menu_des_ingles", default: "Desayuno Inglés" }, ingredientes: "frijol rojo, tomate, huevo frito, salchicha, bacon", precio: "8,00 €" },
                    { nombre: { i18nKey: "menu_des_tradicional", default: "Desayuno Tradicional" }, ingredientes: "tostas con mantequilla, mermelada casera, queso curado, jamón serrano", precio: "6,50 €" }
                ]
            },
            {
                title: { i18nKey: "menu_Brunch", default: "Menú de Brunch" },
                bg: "#b4a7d6",
                accent: "#6a329f",
                note: { i18nKey: "menu_Brunch_nota", default: "Un brunch delicioso para compartir." },
                mode: "",
                items: [
                    { nombre: { i18nKey: "menu_brunch_panes_variados", default: "Selección de panes variados" }, ingredientes: "", precio: "" },
                    { nombre: { i18nKey: "menu_brunch_mant_merm", default: "Mantequilla y mermelada casera" }, ingredientes: "mantequilla, mermelada", precio: "" },
                    { nombre: { i18nKey: "menu_surtido", default: "Surtido Dulce" }, ingredientes: "Brownie, cookie, cinnamon", precio: "" },
                    { nombre: { i18nKey: "menu_yogur", default: "Yogur con Frutas" }, ingredientes: "yogur, frutas de temporada", precio: "" },
                    { nombre: { i18nKey: "menu_brunch_zumo", default: "Zumo Natural" }, ingredientes: "naranja, fresa, mango", precio: "" },
                    { nombre: { i18nKey: "menu_brunch_sprit_mojito", default: "Spritzer/Mojito de vino blanco" }, ingredientes: "", precio: "" },
                    { nombre: { i18nKey: "menu_brunch_tosta_1", default: "Tosta a elegir Opción 1" }, ingredientes: "Queso crema, crema de aguacate y huevo frito / revuelto de setas", precio: "16,00 €" },
                    { nombre: { i18nKey: "menu_brunch_tosta_2", default: "Tosta a elegir Opción 2" }, ingredientes: "rúcula, queso manchego, huevo frito con aceite de albahaca / pata asada con pimientos de piquillo a la plancha y mayonesa de pimentón", precio: "18,00 €" },
                    { nombre: { i18nKey: "menu_brunch_tosta_3", default: "Tosta a elegir Opción 3" }, ingredientes: "Ternera salteada en salsa teriyaki con tomates cherrys confitados y mayonesa de ají amarillo / pisto de veduras con huevo pochado", precio: "20,00 €" }
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