import React from 'react'
function View({image}) {
  console.log(image);
  return (
    
<div>
<img 
  src={require(`../src/images/${image}`)}
  height={1400}
  width={1400}

  alt="no"
/>
</div>
  )
}

export default View