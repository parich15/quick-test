// Code by Oscar Paricio Garcia

const drawContainer = (containerSize, childSize, numberOfChildren) => { 
    
    // First, we have to validate the parameters to be sure that they are integer numbers and greater than 0
    try {
        containerSize    = Math.abs(parseInt(containerSize));
        numberOfChildren = parseInt(numberOfChildren);
        childSize        = parseInt(childSize);

        if(childSize > containerSize){
            throw new Error("Child size cant be greater than the container size")
        }

        if((containerSize == 0 || isNaN(containerSize)) || (numberOfChildren == 0 || isNaN(numberOfChildren)) || (childSize == 0 || isNaN(childSize))) {
           throw new Error('Parameters need to be a number and greater than 0')
        }

    } catch (error) {
       alert(error);
       return;
    }

    // Next, we calculate how many childs can fit in the container.
    // To obtain the max number of squares that fits we have to multiply for both (height and width)
    const maxChildren = Math.floor(containerSize / childSize ) ** 2;

    // We check if the container can fit the children and start creating the grid.
    if(maxChildren < numberOfChildren) {
        alert(`${numberOfChildren} can't fit in this container. Showing ${maxChildren} children in the container`);
        createGrid(containerSize, childSize, maxChildren);
    }else{
        createGrid(containerSize, childSize, numberOfChildren)
    }

};

// Helper that creates the grid based on the parameters and validations in the previous function
const createGrid = (containerSize, childSize, numberOfChildren) => {
    // Select the container
    const container = document.querySelector('#mainSquare');

    // Reset the div styling
    container.innerHTML = '';

    // Start styling the container
    container.style.width    = `${containerSize}px`;
    container.style.height   = `${containerSize}px`;
    container.style.display  = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.overflow = 'hidden';
    container.style.alignContent = 'flex-start';

    // Loop and creation of children (and timer for events)
    for(i = 0; i < numberOfChildren; i++){
        const children = document.createElement('div');
        let timer;

        // Style the children
        children.style.width            = `${childSize}px`;
        children.style.height           = `${childSize}px`;
        children.style.backgroundColor  = randomColor();
        children.style.margin           = '0';
        children.style.transition       = 'all 500ms';

        // Attach event listener on hover to change color and start timer
        children.addEventListener('mouseover', (e)=> {
            e.target.style.backgroundColor = randomColor();
            timer = setTimeout(() => {
                e.target.style.opacity = '0';
            }, 2000);
        })

        // Stop timer and reset opacity of children.
        children.addEventListener('mouseout', (e) => {
            clearTimeout(timer)
            e.target.style.opacity = '1';
        });

    container.append(children)      
    }
    
}

// Utility for random colors:
// Note: 16777216 is the maximum value representable in 24 bits
const randomColor = () => '#' + Math.floor(Math.random()*16777216).toString(16);

// Tests
// drawContainer(310, 200, 4);
// drawContainer(413, 42, 30);
// drawContainer(200, 300, 2);
drawContainer(1000, 80, 200);

