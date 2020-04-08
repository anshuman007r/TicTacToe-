export function calculateWinner(squares)
{
  let statement=[];
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
for(let i=0;i<lines.length;i++)
{

    const [a,b,c]=lines[i];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    { 
      statement.push(squares[a]);
      statement.push([a,b,c]);  
      return statement;
    }
}
statement.push(null);
statement.push([0,0,0]);

return statement;
};

export function bold_bar(stepCount)
{
  if(stepCount)
  {
    document.getElementById(stepCount).style.fontWeight="bold";
  }

}