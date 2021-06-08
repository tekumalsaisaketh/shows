
async function getData(show)
{   
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${show}`)
    const string=await response.text();
    const data=await JSON.parse(string);
    console.log(data);
    if (data.length === 0)
    {
      let tag1 = document.createElement("div");
      tag1.innerHTML = `No results found for &nbsp <span id="white">  '${show}'</span>`
      tag1.setAttribute("class","text-4xl flex items-center justify-center font-semibold text-red-400");
      
      document.getElementById("hello").appendChild(tag1);
      
    }
    else
    {
      for(let i=0; i<data.length;i++)
      {
        let tag1 = document.createElement("div");
        tag1.setAttribute("class", "item");
        let img = document.createElement("img");
        img.setAttribute("class","img1")
        let desc=document.createElement("p");
        let name=document.createElement("h2");
        let link=document.createElement("a");
        name.setAttribute("id","name");
        desc.setAttribute("id","desc");
        let tag2=document.createElement("div");
        tag2.setAttribute("id","tag2");
        tag2.setAttribute("class","container-fluid")

        
        link.setAttribute("id","link")
        tag1.appendChild(img);
        tag2.appendChild(name);
        tag2.appendChild(desc);
        tag2.appendChild(link);
        tag1.appendChild(tag2);

        if (data[i].show.image && data[i].show.image.medium && data[i].show.summary)
        {
          img.src = data[i].show.image.medium;
          name.innerHTML=data[i].show.name;
          let sum = data[i].show.summary.split('.');
          let para="";
          for(let i=0;i<sum.length;i++)
          {
              para+=sum[i];
              if(para.length>=200)
              {
                  break;
              }
          }
          desc.innerHTML = para;
          link.innerHTML="Watch Here";
          link.href = data[i].show.officialSite
          document.getElementById("hello").appendChild(tag1);
        }
      }
    }
}

function f2()
{
  let show = document.getElementById("names").value;
  let a = document.getElementById("hello");
  
  function removeAllChildNodes(parent) 
  {
      while (parent.firstChild) 
      {
        parent.removeChild(parent.firstChild);
      }
    }
  removeAllChildNodes(a);
    
  getData(show);
}

function f1()
{
      let text="";
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new window.SpeechRecognition();

      recognition.interimResults =false;

      recognition.addEventListener('result', (e) => {
          text = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
          document.getElementById("names").value = text;
          f2();
        //console.log(text);
        //const array
      })

      recognition.start();


}
  
 
