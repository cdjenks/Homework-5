      const m = moment();
      let tasks = {};

  
      // Set current day and date in header
      $("#currentDay").text(m.format("dddd[,] MMMM Do"));

      var textBlockIds = ["textblock9", "textblock10", "textblock11", "textblock12", "textblock1", "textblock2", "textblock3", "textblock4", "textblock5"];

      $(".save-button").on("click", function() { 
          const task = $(this).prev().val();
          const hour = $(this).prev().attr("data-hour");

          tasks[hour] = task;

          localStorage.setItem(m.format("L"), JSON.stringify(tasks))
      })
      
      function loadTasks(){
          
          savedTasks = localStorage.getItem(m.format("L"))
          if(savedTasks){
             tasks = JSON.parse(savedTasks)
             textBlockIds.forEach(id => {
                 var hour = $(`#${id}`).attr("data-hour");
                 var task = tasks[hour];   
                 if (task) {
                   $(`#${id}`).text(task)
                 }
             })
          }
      }

      function plannerColorCode() {
          textBlockIds.forEach(id => {
              var hour = $(`#${id}`).attr('data-hour');
              
              if (hour > m.format("HH") ) {
                $(`#${id}`).addClass("before")
              }
              else if (hour < m.format("HH")  ) {
                $(`#${id}`).addClass("after")
              }
             
          })

      }
      
      plannerColorCode();
      loadTasks();