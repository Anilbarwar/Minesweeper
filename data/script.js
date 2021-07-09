let bomb = new Map();
let bcount = [];
let gameover = false;
let mark = false, remove = false;


for(let i = 0;i < 20;i++)
{
    let x = Math.floor(Math.random() * 100) + 1;
    bomb.set(x, 1);
}

//Valid index
function valid(i, j)
{
    if(i < 0 || j < 0 || i == 10 || j == 10)
        return false;
    return true;
}

//COUNTING
for(let i = 0;i < 100;i++)
{
    if(bomb.has(i+1))
    {
        bcount.push(-1);
        continue;
    }
    if((i+1) % 10 == 0)
        {
            posx = ((i+1) / 10) - 1;
            posy = 9;
        }
        else
        {
            posx = Math.floor((i+1) / 10);
            posy = Math.floor((i+1) % 10) - 1;
        }
    let ans = 0;
    if(valid(posx+1, posy))
    {
        let temp = ((posx+1) * 10) + posy + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx, posy+1))
    {
        let temp = (posx * 10) + posy+1 + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx-1, posy))
    {
        let temp = ((posx-1) * 10) + posy + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx, posy-1))
    {
        let temp = ((posx) * 10) + posy;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx+1, posy+1))
    {
        let temp = ((posx+1) * 10) + posy+1 + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx-1, posy-1))
    {
        let temp = ((posx-1) * 10) + posy-1 + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx+1, posy-1))
    {
        let temp = ((posx+1) * 10) + posy-1 + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    if(valid(posx-1, posy+1))
    {
        let temp = ((posx-1) * 10) + posy+1 + 1;
        if(bomb.has(temp))
            ans = ans + 1;
    }
    bcount.push(ans);
}


function m1()
{
    remove = false;
    if(mark == false)
    mark = true;
    else
    mark = false;
}


function r1()
{
    mark = false;
    if(!remove)
        remove = true;
    else
        remove = false;
}

function paint(x, num)
{
    x.style.background = "linear-gradient(to left top, #001040, #fffaff)";
    
    if(bcount[num-1] != 0)
    {
        let str = bcount[num-1].toString();
        x.innerHTML = str.fontcolor("rgba(124,81,54,0.4)");
        x.style.fontWeight = "bold";
    }
}


function check(num)
{
    let x = document.getElementById(num);
    if(mark)
    {
        x.style.backgroundImage = "url('data/danger.png')";
        x.style.backgroundSize = "40px 40px";
        mark = false;
        return;
    }
    if(remove)
    {
        x.style.backgroundImage = 'none';
        x.style.background = "linear-gradient(to left top,rgba(0, 0, 0, 0.5), rgba(20, 17, 228, 0.9))";
        remove = false;
        return;
    }
    if(gameover)
        location.reload();
    
    let vis = new Array(100);
    for (let i = 0; i < vis.length; i++) {
        vis[i] = false;
    }
    let queue = [];

    if(bomb.has(num))
    {
        x.style.backgroundImage = "url('data/mines.png')";
        x.style.backgroundSize = "40px 40px";
        x.style.backgroundRepeat = "no-repeat";
        gameover = true;
        return;
    }
    console.log(bomb);
    // console.log("my pos"+ num)
    let i = 0;
    queue.push(num);
    while(queue.length != i)
    {
        let posx, posy, add = [];
        if(queue[i]%10 == 0)
        {
            posx = (queue[i]/10)-1;
            posy = 9;
        }
        else
        {
            posx = Math.floor(queue[i] / 10);
            posy = Math.floor(queue[i] % 10) - 1;
        }
        vis[queue[i]] = true;
        if(bcount[queue[i]-1] > 0 && bcount[queue[i]-1] <= 8)
        {
            x = document.getElementById(queue[i]);
            paint(x, queue[i]);
            i++;
            continue;
        }
        if(valid(posx+1, posy))
        {
            let temp = ((posx+1) * 10) + posy + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx, posy+1))
        {
            let temp = (posx * 10) + posy+1 + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx-1, posy))
        {
            let temp = ((posx-1) * 10) + posy + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx, posy-1))
        {
            let temp = ((posx) * 10) + posy;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx+1, posy+1))
        {
            let temp = ((posx+1) * 10) + posy+1 + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx-1, posy-1))
        {
            let temp = ((posx-1) * 10) + posy-1 + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx+1, posy-1))
        {
            let temp = ((posx+1) * 10) + posy-1 + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        if(valid(posx-1, posy+1))
        {
            let temp = ((posx-1) * 10) + posy+1 + 1;
            
            if(!vis[temp])
                add.push(temp);
            vis[temp] = true;
        }
        x = document.getElementById(queue[i]);
        paint(x, queue[i]);
        if(bcount[queue[i]-1] == 0)
        {
            for(let j = 0;j < add.length;j++)
                queue.push(add[j]);
        }
        i++;
    }
}

