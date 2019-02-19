var width = 500, height = 500
var draw = SVG('drawing').size(width, height)

var star_map = []

var edges = draw.rect(width, height).fill('none').stroke({width: 1, color: 'gray'})

var selectedHex

var Hex = Honeycomb.extendHex({ size: 28,
    render(draw) 
    {
        var position = this.toPoint()
        var centerPosition = this.center().add(position)
        var fontSize = 8

        var { x, y } = this.toPoint()
        var corners = this.corners()

        this.poly = draw
            .polygon(corners.map(({ x, y }) => `${x},${y}`))
            .fill('MidnightBlue ')
            .stroke({ width: 0.5, color: 'LightSlateGray ' })
            .translate(x, y)

        this.coord = draw
            .text(`${this.x},${this.y}`)
            .font({size: fontSize, anchor: 'middle', leading: 1.4, fill: 'LIGHTGRAY'})
            .translate(centerPosition.x, centerPosition.y + (1.5 * fontSize))
    },

    blink() 
    {
        console.log('blink()')
        this.poly
            //.stop(true, true)
            .fill({opacity: 1})
            .animate(500)
            .fill({opacity: 0.75})
            .loop(null, true)
    },

    stopBlink()
    {
        this.poly.finish()
            .fill({opacity: 1})
    },

    drawSun()
    {
        var position = this.toPoint()
        this.sun = draw.image('./asset/png/star02.png', 16, 16)
            .translate(position.x + 16, position.y + 16)
    }

})

var Grid = Honeycomb.defineGrid(Hex)
var grid = Grid.rectangle(
{
    width: 10,
    height: 10,
    onCreate(hex)
    {
        hex.render(draw)
        if((hex.x == 5 && hex.y == 5) || (hex.x == 2 && hex.y == 6) || (hex.x == 7 && hex.y == 4))
        {
            hex.drawSun()
        }
    }
})

document.addEventListener('click', ({ offsetX, offsetY }) => 
{
    var hexCoordinates = Grid.pointToHex([offsetX, offsetY])
    var hex = grid.get(hexCoordinates)
    if(selectedHex)
    {
        selectedHex.stopBlink()
    }
    if (hex) 
    {
        selectedHex = hex
        hex.blink()
    }
        
})