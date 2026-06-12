/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package examenprimerparcial;

import java.util.Scanner;

public class ExamenPrimerParcial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int opcion;
        String nombre = "", apellidoPaterno = "", apellidoMaterno = "", fechaNacimiento = "";

        do {
            System.out.println("\n===== MENU =====");
            System.out.println("1. Capturar datos personales");
            System.out.println("2. Calcular volumen");
            System.out.println("3. Mostrar datos");
            System.out.println("4. Salir");
            System.out.print("Elige una opcion: ");

            while (!sc.hasNextInt()) {
                System.out.println("Error: ingresa un numero.");
                sc.next();
            }
            opcion = sc.nextInt();
            sc.nextLine();

            switch (opcion) {

                case 1:
                    do {
                        System.out.print("Nombre: ");
                        nombre = sc.nextLine();
                    } while (!nombre.matches("[a-zA-Z ]+"));

                    do {
                        System.out.print("Apellido paterno: ");
                        apellidoPaterno = sc.nextLine();
                    } while (!apellidoPaterno.matches("[a-zA-Z ]+"));

                    do {
                        System.out.print("Apellido materno: ");
                        apellidoMaterno = sc.nextLine();
                    } while (!apellidoMaterno.matches("[a-zA-Z ]+"));
                    
                    boolean fechaValida;

                    do {
                        fechaValida = true;
                        System.out.print("Fecha de nacimiento (dd/MM/yyyy): ");
                        fechaNacimiento = sc.nextLine();

                        String partes[] = fechaNacimiento.split("/");

                        if (partes.length != 3) {
                            fechaValida = false;
                        } else {
                            try {
                                int dia = Integer.parseInt(partes[0]);
                                int mes = Integer.parseInt(partes[1]);
                                int anio = Integer.parseInt(partes[2]);

                                if (mes < 1 || mes > 12) fechaValida = false;
                                if (dia < 1 || dia > 31) fechaValida = false;
                                if (anio < 1900 || anio > 2026) fechaValida = false;

                            } catch (NumberFormatException e) {
                                fechaValida = false;
                            }
                        }

                        if (!fechaValida) {
                            System.out.println("Error: fecha invalida. Usa formato dd/MM/yyyy");
                        }

                    } while (!fechaValida);

                    break;

                case 2:
                    int figura;
                    System.out.println("\n--- Calculo de volumen ---");
                    System.out.println("1. Cilindro");
                    System.out.println("2. Cono");
                    System.out.print("Elige figura: ");

                    while (!sc.hasNextInt()) {
                        System.out.println("Error: ingresa un numero.");
                        sc.next();
                    }
                    figura = sc.nextInt();

                    double radio, altura;

                    System.out.print("Radio: ");
                    while (!sc.hasNextDouble()) {
                        System.out.println("Error: ingresa un numero valido.");
                        sc.next();
                    }
                    radio = sc.nextDouble();

                    System.out.print("Altura: ");
                    while (!sc.hasNextDouble()) {
                        System.out.println("Error: ingresa un numero valido.");
                        sc.next();
                    }
                    altura = sc.nextDouble();

                    if (figura == 1) {
                        double volumen = Math.PI * radio * radio * altura;
                        System.out.println("Volumen del cilindro: " + volumen);
                    } else if (figura == 2) {
                        double volumen = (Math.PI * radio * radio * altura) / 3;
                        System.out.println("Volumen del cono: " + volumen);
                    } else {
                        System.out.println("Opcion no valida.");
                    }

                    sc.nextLine();
                    break;

                case 3:
                    System.out.println("\n--- Datos personales ---");
                    System.out.println("Nombre: " + nombre);
                    System.out.println("Apellido paterno: " + apellidoPaterno);
                    System.out.println("Apellido materno: " + apellidoMaterno);
                    System.out.println("Fecha de nacimiento: " + fechaNacimiento);
                    break;

                case 4:
                    System.out.println("Saliendo del programa...");
                    break;

                default:
                    System.out.println("Opcion invalida");
            }

        } while (opcion != 4);

        sc.close();
    }  
}
