import { IsString, IsNumber, IsDate, IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsString({
    message:
      "El nombre del producto debe ser una cadena de texto, por ejemplo: 'Zapatos deportivos'",
  })
  @IsNotEmpty({
    message:
      "El nombre del producto es obligatorio. Por favor, ingresa un nombre",
  })
  nombre: string;

  @IsString({
    message:
      "La descripción del producto debe ser una cadena de texto, por ejemplo: 'Zapatos deportivos de alta calidad'",
  })
  @IsNotEmpty({
    message:
      "La descripción del producto es obligatoria. Por favor, ingresa una descripción",
  })
  descripcion: string;

  @IsString({
    message: "La marca debe ser una cadena de texto, por ejemplo: 'Nike'",
  })
  @IsNotEmpty({
    message:
      "La marca es obligatoria. Por favor, ingresa la marca del producto",
  })
  marca: string;

  @IsString({
    message:
      "El precio debe ser un número representado como cadena de texto, por ejemplo: '100.50'",
  })
  @IsNotEmpty({
    message:
      "El precio es obligatorio. Por favor, ingresa el precio del producto",
  })
  precio: string;

  @IsString({
    message:
      "El stock debe ser un número representado como cadena de texto, por ejemplo: '50'",
  })
  @IsNotEmpty({
    message:
      "El stock es obligatorio. Por favor, ingresa la cantidad disponible del producto",
  })
  stock: string;

  @IsNumber(
    {},
    { message: "La calificación debe ser un número, por ejemplo: '4.5'" }
  )
  calificacion: number;

  @IsDate({
    message:
      "La fecha de publicación debe ser una fecha válida, por ejemplo: '2022-12-31'",
  })
  fechaPublicacion: Date;

  @IsString({
    message:
      "La imagen debe ser una URL válida de la imagen del producto, por ejemplo: 'https://link.com/imagen.jpg'",
  })
  @IsNotEmpty({
    message:
      "La imagen es obligatoria. Por favor, ingresa el enlace de la imagen del producto",
  })
  imagen: string;

  @IsString({
    message:
      "El nombre de la categoría debe ser una cadena de texto, por ejemplo: 'Deportes'",
  })
  @IsNotEmpty({
    message:
      "El nombre de la categoría es obligatorio. Por favor, ingresa el nombre de la categoría",
  })
  categoria: string;
}
