var _startPoint_X = 200;
var _startPoint_Y = 400;

function displayControls(shapeName) {
    $(".inputGroup").hide();
    switch (shapeName) {
        case "IsoscelesTriangle":
            $("#widthInput,#heightInput").show();
            break;
        case "ScaleneTriangle":
            $("#widthInput,#heightInput,#sideLengthInput").show();
            break;
        case "Rectangle":
            $("#widthInput,#heightInput").show();
            break;
        case "Parallelogram":
            $("#widthInput,#heightInput,#angleInput").show();
            break;
        case "Circle":
            $("#radiusInput").show();
            break;
        case "Oval":
            $("#radiusInput,#maxRadiusInput").show();
            break;
        case "None":
            $(".inputGroup").hide();
            break;
        default:
            $("#radiusInput").show();
            break;
    }
}

$(document).ready(function () {
    $("#alertDiv").text("");
    $("#alertDiv").hide();
    $(".inputGroup").hide();
    $(".shapeSelector").on("change", function () {
        $("#alertDiv").hide();
        displayControls($(".shapeSelector").val());
    });
});

function drawTriangle(ctx, shapeName, width, height, sideTwo) {
    var xPoint2 = _startPoint_X + width;
    var yPoint3 = _startPoint_Y - height;
    if (shapeName === "Scalene Triangle") {
        var xPoint3 = _startPoint_X + Math.sqrt(sideTwo * sideTwo - height * height);
        ctx.beginPath();
        ctx.moveTo(_startPoint_X, _startPoint_Y);
        ctx.lineTo(xPoint2, _startPoint_Y);
        ctx.lineTo(xPoint3, yPoint3);
        ctx.closePath();
    } else if (shapeName === "Isosceles Triangle") {
        var xPoint3 = _startPoint_X + width / 2;
        ctx.beginPath();
        ctx.moveTo(_startPoint_X, _startPoint_Y);
        ctx.lineTo(xPoint2, _startPoint_Y);
        ctx.lineTo(xPoint3, yPoint3);
        ctx.closePath();
    }
};

function drawParallelogram(ctx, width, height, angle) {
    var a = Math.PI * angle / 180;
    var extraLenght = height / Math.tan(a);
    var xPoint2 = _startPoint_X + width;
    var xPoint3 = _startPoint_X + width + extraLenght;
    var yPoint3 = _startPoint_Y - height;
    var xPoint4 = _startPoint_X + extraLenght;
    var yPoint4 = _startPoint_Y - height;
    ctx.beginPath();
    ctx.moveTo(_startPoint_X, _startPoint_Y);
    ctx.lineTo(xPoint2, _startPoint_Y);
    ctx.lineTo(xPoint3, yPoint3);
    ctx.lineTo(xPoint4, yPoint4);
    ctx.closePath();
}

function drawCircle(ctx, radius) {
    ctx.beginPath();
    ctx.arc(_startPoint_X, _startPoint_Y, radius, 0, 2 * Math.PI);
    ctx.closePath();
}

function drawOval(ctx, minRadius, maxRadius) {
    ctx.beginPath();
    ctx.ellipse(_startPoint_X, _startPoint_Y, minRadius, maxRadius, 90 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.closePath();
}

function drawRectangle(ctx, width, height) { 
    ctx.beginPath();
    ctx.moveTo(_startPoint_X, _startPoint_Y);
    ctx.lineTo(_startPoint_X + width, _startPoint_Y);
    ctx.lineTo(_startPoint_X + width, _startPoint_Y-height);
    ctx.lineTo(_startPoint_X, _startPoint_Y - height);
    ctx.closePath();
}

function drawEquilateralShapes(ctx, shapeName, radius) {
    var sideNumber;
    _startPoint_X = 300;
    _startPoint_Y = 300;
    switch (shapeName) {
        case 3: //"Equilateral Triangle"
            sideNumber = 3
            break;
        case 5: //"Square"
            sideNumber = 4;
            break;
        case 7: //"Pentagon"
            sideNumber = 5;
            break;
        case 8: //"Hexagon"
            sideNumber = 6;
            break;
        case 9: //"Heptagon"
            sideNumber = 7;
            break;
        case 10: //"Octagon"
            sideNumber = 8;
            break;
    }
    var angle = (Math.PI * 2) / sideNumber;
    ctx.beginPath();
    ctx.save();
    ctx.translate(_startPoint_X, _startPoint_Y);
    for (var i = 1; i <= sideNumber; i++) {
        ctx.lineTo(radius * Math.cos(angle * i), radius * Math.sin(angle * i));
    }
    ctx.closePath();
    ctx.restore();
}
 
function drawShape(response) {
    $("#alertDiv").text("");
    $("#alertDiv").hide();
    var canvas = $("#drawArea")[0];
    try {
        var ctx = canvas.getContext('2d');
    } catch (e) {
        alert("HTML5 Canvas is not supported in your browser.");
        return;
    }
    $(".inputGroup").hide();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (response.ShapeName) {
        case 1:
            drawTriangle(ctx, "Isosceles Triangle", response.Width, response.Height, 0);
            break;
        case 2:
            drawTriangle(ctx, "Scalene Triangle", response.Width, response.Height, response.AngleSideLength);
            break;
        case 4:
            drawRectangle(ctx, response.Width, response.Height);
            break;
        case 6:
            drawParallelogram(ctx, response.Width, response.Height, response.Angle);
            break;
        case 11:
            drawCircle(ctx, response.Radius);
            break;
        case 12:
            drawOval(ctx, response.Radius, response.MaxRadius);
            break;
        case 0:
            break;
        default:
            drawEquilateralShapes(ctx, response.ShapeName, response.Radius)
            break;
    }
    displayControls($(".shapeSelector").val());
    ctx.strokeStyle = "#bada55";
    ctx.fillStyle = "#bada55";
    ctx.lineWidth = 2;
    ctx.stroke();
};

function onFailure(response) {
    $("#alertDiv").show();
    $("#alertDiv").text(response.statusText);
}