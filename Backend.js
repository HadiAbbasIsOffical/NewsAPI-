let articleTitle=document.querySelectorAll('.Articletitle');
    let cardDiv=document.querySelector('.CardDiv')
    let divImage=document.querySelectorAll('.divImage')
    let mainDiv=document.querySelector('.InPortion')
    const APIKEY="f1d5a4ef69674ed3a245f41e3e30ca39";
    const APIKEYFINAL=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${APIKEY}`
    let acount=0
    let ErrorMsg=document.querySelector('.ErrorText')

let TitleRefresh=document.querySelector('.NavbarTitle');
TitleRefresh.addEventListener('click',()=>{
    window.location.reload()
})
    function CreateNewCard(step2,acount){

        let location_href=step2.articles[acount].url
        let CardDivTo=document.createElement('div')
        CardDivTo.classList.add('CardDiv')
        let NewimageTo=document.createElement('img')
        NewimageTo.classList.add('divImage');
        let TitleTo=document.createElement('p');
        TitleTo.classList.add('Articletitle');
        CardDivTo.append(NewimageTo)
        CardDivTo.append(TitleTo)
        mainDiv.append(CardDivTo);
        TitleTo.textContent=step2.articles[acount].title
        NewimageTo.src=step2.articles[acount].urlToImage;
        NewimageTo.onerror=function(){
            this.src="NoimageError.webp"
        }
        CardDivTo.addEventListener('click',()=>{
            window.location.href=location_href
        })
    }
    document.addEventListener("DOMContentLoaded", async () => {
        let step2;
        let timeoutReached = false;
    
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                timeoutReached = true;
                reject(new Error('Timeout'));
            }, 3000); 
        });
    
        try {
            const step1Promise = fetch(APIKEYFINAL);
            const response = await Promise.race([step1Promise, timeoutPromise]);
    
            if (timeoutReached) {
                throw new Error('Timeout');
            }
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            step2 = await response.json();
        } catch (error) {
            if (!timeoutReached) {
                ErrorMsg.textContent = 'Internet Error x-x';
                ErrorMsg.style.display = 'block';
                console.log('internet error', error);
            }
            return; 
        }
    
        console.log(step2.articles.length);
        let length = step2.articles.length;
        if (mainDiv.childElementCount <= length) {
            for (let x = 0; x < step2.articles.length; x++) { 
                CreateNewCard(step2, acount);
                acount += 1;
            }
        }
    });
    
    let SearchingInput=document.querySelector('#SearchInput')
    document.querySelector('.SearchButton').addEventListener('click',async()=>{
        let step1=await fetch(APIKEYFINAL);
        let step2=await step1.json();
        let ErrorMsg=document.querySelector('.ErrorText')
        let parentDiv=document.querySelector('.InPortion')
        let SearchPortion=document.querySelector('.SearchPortion');
        // parentDiv.childNodes.forEach(node=>{console.log(node.childNodes[1].childNodes)})
        let sentence=SearchingInput.value;
        console.log(SearchPortion.childElementCount)

        console.log(sentence)
        SearchPortion.innerHTML = '';
        ErrorMsg.style.display = 'none';

        let c=0;

            step2.articles.forEach(article=>{
                let articlefinal=article.title
                let articlefinal2=articlefinal.toLowerCase()
                finalarticle=articlefinal2.split(' ')
                finalsentence=sentence.split(' ')
                for(let x=0;x<=finalsentence.length;x++){
                    if(articlefinal2.includes(finalsentence[x]) && finalsentence[x] !='with' && finalsentence[x] !='and'){
                        c+=1
                    }
                    }
                    if(c >=1){
                        console.log(articlefinal2,'is present')
                        if(ErrorMsg.style.display=='block'){
                            ErrorMsg.style.display='none'
                        }
                        c=0;

                        parentDiv.style.display='none'

                        let location_href=article.url
                        let CardDivTo=document.createElement('div')
                        CardDivTo.classList.add('CardDiv')
                        let NewimageTo=document.createElement('img')
                        NewimageTo.classList.add('divImage');
                        let TitleTo=document.createElement('p');
                        TitleTo.classList.add('Articletitle');
                        CardDivTo.append(NewimageTo)
                        CardDivTo.append(TitleTo)
                        SearchPortion.append(CardDivTo);
                        TitleTo.textContent=article.title
                        NewimageTo.src=article.urlToImage;

                        // if(ErrorMsg.style.display=='none'){
                        //     ErrorMsg.style.display='none';
                        //     console.log('done')
                        // }
                        NewimageTo.onerror=function(){
                            this.src="NoimageError.webp"
                        }
                        CardDivTo.addEventListener('click',()=>{
                            window.location.href=location_href
                        })

                    }
                    
                    c=0;

                }
        
                // parentDiv.style.display='none'

          
            )
            if (SearchPortion.childElementCount< 1) {
                parentDiv.style.display = 'none';
                ErrorMsg.textContent='Sorry No Such Article Is found :/'
                ErrorMsg.style.display = 'block';
            }

                })
        


