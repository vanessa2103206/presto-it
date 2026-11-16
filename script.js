
    
 
    let numberOne = document.querySelector('#countCustomers');
    let numberTwo = document.querySelector('#countProducts');
    let numberThree = document.querySelector('#countReviews');

    function createInterval(finalN, element) {
        let counter = 0;
        let interval = setInterval(() => {
            if (counter < finalN) {
                counter++;
                element.innerHTML = counter;
            } else {
                clearInterval(interval);
            }
        }, 10); 
    }

   let confirm = false;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm == false) {
            createInterval(250, numberOne);
            createInterval(180, numberTwo);
            createInterval(300, numberThree);
            confirm = true;

            setTimeout(() => {
                confirm = false;
            }, 5000);
        }
    });
});

observer.observe(numberOne);



    
    
    
    let reviews = [
        { name: "Obi-Wan", review: "May the Force be with you!" },
        { name: "Anakin", review: "I am your father!" },
        { name: "Yoda", review: "Much to learn you have." }
    ];

   
    let carouselInner = document.querySelector('.carousel-inner');

     
        
        reviews.forEach((review, index) => {
            let div = document.createElement('div');
            
            div.classList.add('carousel-item');
            
           
            if (index === 0) {
                div.classList.add('active');
            }

            
            div.innerHTML = `
                <div class="reviewCard">
                    <p class="lead fw-bold">${review.name}</p>
                    <p class="p-3">"${review.review}"</p>
                </div>
            `;

            carouselInner.appendChild(div);
        });
    

