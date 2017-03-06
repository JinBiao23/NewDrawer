using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web; 
namespace Draw.Models
{
    public class Shape
    {
        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        public Draw.Infrustracture.Enums.ShapeName ShapeName { get; set; }
        [Range(0, 500, ErrorMessage = "Width value should not more then 500.")]
        public int? Width { get; set; }
        [Range(0, 500, ErrorMessage = "Height value should not more then 500.")]
        public int? Height { get; set; }
        [Range(0, 90, ErrorMessage = "Angle value should not more then 90 degree.")]
        public int? Angle { get; set; }
        [Range(0, 500, ErrorMessage = "Radius value should not more then 500.")]
        public int? Radius { get; set; }
        [Range(0, 500, ErrorMessage = "MaxRadius value should not more then 500.")]
        public int? MaxRadius { get; set; }
        [Range(0, 500, ErrorMessage = "AngleSideLength value should not more then 500.")]
        public int? AngleSideLength { get; set; }

        public bool ValidateData(out string message)
        { 
            if (ShapeName == Infrustracture.Enums.ShapeName.ScaleneTriangle)
            {
                if (!Width.HasValue || !Height.HasValue || !AngleSideLength.HasValue)
                {
                    message = "Draw scalene triangle shape width, height and angle side length should be provided.";
                    return false;
                }
                if (AngleSideLength.Value <= Height.Value) {
                    message = "Draw scalene triangle shape height should longer then angle side.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.IsoscelesTriangle)
            {
                if (!Width.HasValue || !Height.HasValue)
                {
                    message = "Draw Isosceles triangle shape width and height should be provided.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.Parallelogram)
            {
                if (!Width.HasValue || !Height.HasValue || !Angle.HasValue)
                {
                    message = "Draw Parallelogram shape width, height and angle should be provided.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.Circle)
            {
                if (!Radius.HasValue)
                {
                    message = "Draw Circle shape radius should be provided.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.Oval)
            {
                if (!Radius.HasValue || !MaxRadius.HasValue)
                {
                    message = "Draw Oval shape radius and max radius should be provided.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.Rectangle)
            {
                if (!Width.HasValue || !Height.HasValue)
                {
                    message = "Draw Rectangle shape width and height should be provided.";
                    return false;
                }
            }
            else if (ShapeName == Infrustracture.Enums.ShapeName.None)
            {
                message = "Shape name is required.";
                return false;
            }
            else { 
                //draw equilatgeralshapes
                if (!Radius.HasValue)
                {
                    message = "Draw equilateral shapes radius should be provided.";
                    return false;
                }
            }
            message = "Success";
            return true;
        }
    }
}