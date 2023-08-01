// Code by Oscar Paricio Garcia | 26 - 07 - 23
// Re make of Quick Test, this time using OOP (Object-Oriented)

const drawContainer = (containerSize, childSize, numberOfChildren) => {

    //Initially, we create the object with all the data we are gonna need.
    //Make use of a getter to calculate the maximum squares that fit.

    const grid = {
        parent:     containerSize,
        child:      childSize,
        number:     numberOfChildren,
        dom:        document.querySelector('#mainSquare'),
        get max() {
            return Math.floor(this.parent / this.child) ** 2
        }
    }

    // We run a validation of parameters and return the object purified (Negative numbers or string as numbers)
    validation(grid);

    // If child number doesn't fit, we update with the maximum and let the user know.
    if (grid.max < grid.number) {
        const message     =  document.createElement('p');
        message.innerHTML = `${grid.number} can't fit in this container. Showing ${grid.max} children in the container`;
        document.querySelector('body').prepend(message);

        // Update the grid number of childs we are gonna use to render the grid
        grid.number = grid.max;
    }

    // Styling the parent
    grid.dom.innerHTML          =  '';
    grid.dom.style.width        =  grid.parent + 'px';
    grid.dom.style.height       =  grid.parent + 'px';
    grid.dom.style.display      = 'flex';
    grid.dom.style.flexWrap     = 'wrap';
    grid.dom.style.overflow     = 'hidden';
    grid.dom.style.alignContent = 'flex-start';

    // Next we loop through the number of children, apply the styles and attach events and finnaly append to parent
    for (i = 0; i < grid.number; i++) {
        const children = document.createElement('div');
        let timer;

        // Style the children
        children.dataset.index          = i;
        children.style.width            = grid.child + 'px';
        children.style.height           = grid.child + 'px';
        children.style.backgroundColor  = randomColor();
        children.style.display          = 'inline-block';
        children.style.margin           = '0';
        children.style.transition       = 'all 500ms';

        // Attach event listener on hover to change color and start timer
        // This time we use index attribute to hide the div with precision
        children.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = randomColor();
            timer = setTimeout(() => {
                document.querySelector(`[data-index="${e.target.dataset.index}"]`).style.opacity = '0';

                // If we wanted to remove the div from the dom we can use:
                // document.querySelector(`[data-index="${e.target.dataset.index}"]`).style.display = 'none';
                // Or:
                // document.querySelector(`[data-index="${e.target.dataset.index}"]`).remove()
            }, 2000);
        })

        // Stop timer and reset opacity of children.
        children.addEventListener('mouseout', (e) => {
            clearTimeout(timer)
            e.target.style.opacity = '1';
            e.target.style.backgroundColor = randomColor();
        });

    grid.dom.append(children);

    }
}

// Utility for validation of the parameters of original function. Returns Grid Object purified or breaks the function.
const validation = (grid) => {
    try {
        grid.parent = Math.abs(parseInt(grid.parent));
        grid.child = Math.abs(parseInt(grid.child));
        grid.number = Math.abs(parseInt(grid.number));

        if (grid.parent < grid.child) {
            throw new Error("Child size cant be greater than the container size")
        }

        if ((grid.parent == 0 || isNaN(grid.parent)) || (grid.number == 0 || isNaN(grid.number)) || (grid.child == 0 || isNaN(grid.child))) {
            throw new Error('Parameters need to be a number and greater than 0')
        }

        return grid;

    } catch (error) {
        alert(error);
        return;
    }
}

// Utility for random colors:
// Note: 16777216 is the maximum value representable in 24 bits
const randomColor = () => '#' + Math.floor(Math.random() * 16777216).toString(16);

// drawContainer(100, 10, 200);
// drawContainer(200,300,10);
// drawContainer(-500,100,5);
// drawContainer('c','a',9);
// drawContainer(1350, 100, 200)
drawContainer("100", "10", 200);

