using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Draw.Infrustracture
{
    public class Enums
    {
        public enum ShapeName
        {
            [Description("Please select a Shape")]
            None = 0,
            [Description("Isosceles Triangle")]
            IsoscelesTriangle = 1,
            [Description("Scalene Triangle")]
            ScaleneTriangle = 2,
            [Description("Equilateral Triangle")]
            EquilateralTriangle = 3,
            [Description("Rectangle")]
            Rectangle = 4,
            [Description("Square")]
            Square = 5,
            [Description("Parallelogram Square")]
            Parallelogram = 6,
            [Description("Pentagon")]
            Pentagon = 7,
            [Description("Hexagon")]
            Hexagon = 8,
            [Description("Heptagon")]
            Heptagon = 9,
            [Description("Octagon")]
            Octagon = 10,
            [Description("Circle")]
            Circle = 11,
            [Description("Oval")]
            Oval = 12
        }
    }
}