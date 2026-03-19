# Practica Sensores

Esta aplicacion es una herramienta de captura fotografica automatica basada en sensores del dispositivo. Permite tomar fotos unicamente cuando se cumplen condiciones especificas de orientacion e inclinacion.

## Funcionalidades

- **Monitoreo en tiempo real**: Visualizacion continua de los datos de los sensores.
- **Deteccion de Inclinacion**: Utiliza el acelerometro para calcular el angulo de inclinacion del dispositivo. El rango permitido es entre 40 y 60 grados.
- **Orientacion al Norte**: Utiliza la brujula digital para asegurar que la camara apunte hacia el Norte (con una tolerancia de +/- 15 grados).
- **Captura Automatica**: El disparador se activa automaticamente despues de mantener las condiciones (inclinacion y orientacion correctas) estables durante 800 milisegundos.
- **Geolocalizacion**: Registra las coordenadas GPS (latitud y longitud) en el momento de la captura.
- **Informacion en pantalla**: Muestra fecha, hora, coordenadas y datos de los sensores sobre la imagen capturada.
- **Guardado en Galeria**: Permite guardar la fotografia junto con sus metadatos en la galeria del dispositivo.

## Tecnologias y Librerias

La aplicacion esta construida con React Native y Expo, utilizando las siguientes librerias clave:

- **expo-camera**: Para el acceso a la camara y la captura de imagenes.
- **expo-sensors**: Específicamente el modulo Accelerometer para medir la inclinacion.
- **expo-location**: Para obtener la geolocalizacion (GPS) y la orientacion magnetica (Brujula).
- **expo-media-library**: Para gestionar permisos y guardar las imagenes en el almacenamiento del dispositivo.
- **react-native**: Framework base para la interfaz de usuario.
