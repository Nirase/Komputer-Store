
async function getComputers() 
{
    try
    {
        const computers = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const data = await computers.json();
        return data;
    }
    catch(e)
    {
        console.error(e);
    }
}

let data = await getComputers();
export {data};
export default data;