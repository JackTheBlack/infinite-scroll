import React, { useState, useEffect,  } from 'react';
import Card from './card';
export const InfiniteScrollExample = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  esto es para ir llamando las distinas paginas
  // page se incremneta en 1 cada vez que hago una peticion GET
  const [page, setPage] = useState(1);
  const [three,setThree]=useState([]);


  ///index para ir agregando las peliculas
  const [index,setIndex]=useState(1);
  
  
  const [scroolTop, setScrollTop]=useState(document.documentElement.scrollTop)





  const setThreeMovies=(movies)=>{
    // la primera vez le paso por referencia las tres primeras peliculas (emepzando desde la segunda)

    if (three.length<1){
      setThree(movies.slice(index,index+3));
   
      
    }else{
      
    //la sgunda vez que entra al largo del array "three" ser mayor a 1
    //se agrega las 3 peliculas que siguen en el estado items  
     
      setThree( [...three,...items.slice(index,index+3)])
    }
    
    console.log("page: ",page," response: ",movies)
    setIndex(index+3);
    //incremento el index en 3

  }



    const fetchData = async () => {
  setIsLoading(true);
  setError(null); 
  const options = {
    method: 'GET'
  
}; 


  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`,options)
  .then(response => response.json())
  .then(response =>( setItems([...items, ...response.results]),
                    setPage(page+ 1),setIsLoading(false),setThreeMovies(response.results)
                   ))
  .catch(err => (console.log(err),setIsLoading(false)));
  

};



const handleScroll = () => {
  //si la diferencia entre el scroll to anterior y el actuas es mayor a 56 entonces vuelvo
  // hACER UN LLAMADO A la proxima pagina
  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
   console.log("inner hight: ",window.innerHeight)
   console.log("old scroll top: ",scroolTop)
   console.log("scroll Top: ", document.documentElement.scrollTop)
   console.log("offset hight: ",document.documentElement.offsetHeight)
   
   if ((document.documentElement.scrollTop-scroolTop )>56){
    fetchData();
    setScrollTop( document.documentElement.scrollTop);
   }

  }


};
// hook de efecto que se ejecuta una sola vez para cargar
// las primeras 3 peliculas

useEffect(() => {
 fetchData();
},[]);



// controla el cambio en el scroll
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
});



const container={
  display:"grid",
  gridTemplateColumns:"auto auto auto",

  position:"relative",
  marginTop:"40%",
  top:"60%"
}


return (<>

    <div style={{ position:"relative", justifyItems:"center",  marginTop:"30%",display:"grid", gridTemplateColumns:"auto auto auto"}} >
    {three.map((item,index)=><div style={{position:"relative",marginTop:"4em"}} key={index}><Card item={item} /> </div> )}
    </div>

    <div style={{position:"ralive",marginTop:"40%"}}>

    </div>
    </>
  );
 
};