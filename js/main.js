// Click on the start game button
document.querySelector('.control-buttons span').onclick = function (){
    // Prompt window to write the gamer name
    let yourName = prompt('what is your name?'),
    // Get name span 
     theName = document.querySelector('.name span');
     // If the gamer did not write his name
    if(yourName == null || yourName == ""){
        theName.textContent = 'Unkown'
        // if the gamer write his nmame
    } else {
        theName.innerHTML = yourName;
    }
    // Remove splach screen
    document.querySelector('.control-buttons').remove();
};

   // Main Variabls
   // Duration time
   let duration = 1000,
   // Select blocks container
   blocksContainer = document.querySelector('.memory-blocks'),
   // create array from bloks
   blocks = Array.from(blocksContainer.children),
   // create array from bloks keys
   orderRange = [...Array(blocks.length).keys()]; // or 
   // orderRange = Array.from[(blocks.length).keys()];

   shuffle(orderRange);

   // Add order property for each block
   blocks.forEach((block, index) => {
       block.style.order = orderRange[index];

       // Add click event
       block.addEventListener('click', function (){
        // trigger flip function 
        flipCard(block)

       })
   });

   // Flip block function
   function flipCard (selectedBlock){
       // Add is flipped class
    selectedBlock.classList.add('is-flipped');

    // Filter is flipped class
    let allFlippedBlocks = blocks.filter(flipCard => flipCard.classList.contains('is-flipped'));

    // if bolocks have 2 blocks have is flipped class

    if(allFlippedBlocks.length === 2){
         
        // Stop clicking
        stopClicking();
        
        // check matched blocks
        checkMatchingBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
    }
   }

   function stopClicking (){
       // Add no click class
       blocksContainer.classList.add('no-click');

       // remove no click class 
       setTimeout(() => {
        blocksContainer.classList.remove('no-click');
       }, duration)
       
   }
  
   // Check matching blocks functions
   function checkMatchingBlocks(fristBlock, secondBlock) {
        // set tries count
        let triesCount = document.querySelector('.tries span');

        // check matching blocks condition

        if (fristBlock.dataset.fruits === secondBlock.dataset.fruits) {
             
            fristBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            fristBlock.classList.add('matched');
            secondBlock.classList.add('matched');

            // play success audio
            document.getElementById('success').play();
        }else {

            // Set tries counter
            triesCount.innerHTML = parseInt(triesCount.innerHTML) + 1
             
            setTimeout (()=> {
                fristBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');

            },duration);

             // play fail audio
             document.getElementById('fail').play();
        }
        
    }
   // create shuffle function
   function shuffle(array){
       let current = array.length, // 24
       temp,
       random;
       
       while(current > 0){
            // Get random numbers from blocks length (0 - 23)
            random = Math.floor(Math.random() * current)

            // Decrease lentgh by one (random number - 1)
            current--;

            // Save  current element in the stash
            temp = array[current];
            // current element = random element
            array[current] = array[random];
            // The random  element = The element in stash
            array[random] = temp;   
       } 
       return array;
   }

