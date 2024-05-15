import React from 'react'
function View({image}) {
  console.log(image);
  return (
    
<div>
<img 
  src={require(`../src/images/${image}`)}
  height={500}
  width={500}

  alt="Problem img not found !"
/>
</div>
  )
}

export default View