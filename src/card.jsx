import { useContext } from "react";
export default function Card220({item}){
    const cardPath="http://www.themoviedb.org/t/p/w220_and_h330_face/";
    
    

    const votes=item.vote_average/2

    const returnStar=(key)=>{
        return(
            <article key={key} className="star"></article>
        )
    }



    const getStars=()=>{
       const stars=[]
     
        for(let x=0;x<=votes;x++){
            stars.push(returnStar(x));
        }
        
        return <section style={{display:"flex"}}>{stars} </section>
    }
   

const cardStyle ={
    backgroundImage:`url(${cardPath+item.poster_path})`,
    backgroundSize:"cover",
    width:"220px",
    height:"330px",
    display:"flex",
    flexDirection:"row",
    cursor:"pointer",
    color:"white",
    }

const cardInfo={
    position:"realtive",
    display:"flex",
    flexDirection:"column",
    paddingBottom:"40%",
    marginTop:"98%",
    gap:"10px",
    lineHeight: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    }


const handleClick=()=>{
  console.log("press")
}

return(
    <div  onClick={handleClick} style={cardStyle}>
        <div style={{width:"100%",background: "linear-gradient(180deg, rgba(1, 1, 1, 0) 0%, #010101 100%)"}}>
            <article style={cardInfo}>
                    <span>{item.title} </span>
                    <div className="star-container">
                        {getStars()}
                    </div>
                    <div>
                    
                    </div>
                
            </article>
            
        </div>

    </div>
)


}