var draw = SVG('drawing').size(500, 500)

var Hex = Honeycomb.extendHex({ size: 20 })
var Grid = Honeycomb.defineGrid(Hex)
var corners = Hex().corners()
var hexSymbol = draw.symbol()
    .polygon(corners.map(({ x, y }) => `${x},${y}`))
    .fill('none')
    .stroke({ width: 1, color: '#999' })

Grid.rectangle({ width: 12, height: 12 }).forEach(hex => 
{
    var { x, y } = hex.toPoint()
    draw.use(hexSymbol).translate(x, y)
})