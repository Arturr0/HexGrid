var draw = SVG('drawing').size(500, 500)

var Hex = Honeycomb.extendHex({ size: 30,
    render(draw) 
    {
        var { x, y } = this.toPoint()
        var corners = this.corners()
    
        this.draw = draw
            .polygon(corners.map(({ x, y }) => `${x},${y}`))
          .fill('GreenYellow')
          .stroke({ width: 1, color: 'DarkSlateGray' })
          .translate(x, y)
    },
    highlight() 
    {
        this.draw
          .stop(true, true)
          .fill({ opacity: 1, color: 'Red' })
          .animate(1000)
          .fill({ opacity: 1, color: 'GreenYellow' })
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
        {hex.highlight()}
})