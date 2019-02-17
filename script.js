var draw = SVG('drawing').size(500, 500)

var selectedHex

var Hex = Honeycomb.extendHex({ size: 30,
    render(draw) 
    {
        var { x, y } = this.toPoint()
        var corners = this.corners()
    
        this.draw = draw
            .polygon(corners.map(({ x, y }) => `${x},${y}`))
            .fill('MidnightBlue ')
            .stroke({ width: 0.5, color: 'LightSlateGray ' })
            .translate(x, y)
    },

    blink() 
    {
        this.draw
            .stop(true, true)
            .fill({opacity: 1})
            .animate(500)
            .fill({opacity: 0.75})
            .loop(null, true)
    },
    stopBlink()
    {
        this.draw.finish()
            .fill({opacity: 1})
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