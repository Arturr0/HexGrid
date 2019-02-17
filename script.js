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
            .stroke({ width: 1, color: 'LightSlateGray ' })
            .translate(x, y)
    },
    highlight() 
    {
        if(selectedHex)
        {
            console.log('selectedHex is set')
            selectedHex.draw.finish()
        }
        this.draw
            .stop(true, true)
            .fill({opacity: 1})
            .animate(1000)
            .fill({opacity: 0.75})
            .loop(null, true)
    }
})

var Grid = Honeycomb.defineGrid(Hex)
var grid = Grid.rectangle(
{
    width: 10,
    height: 10,
    onCreate(hex){hex.render(draw)}
})

document.addEventListener('click', ({ offsetX, offsetY }) => 
{
    var hexCoordinates = Grid.pointToHex([offsetX, offsetY])
    var hex = grid.get(hexCoordinates)
  
    if (hex) 
    {
        selectedHex = hex
        hex.highlight()
    }
        
})