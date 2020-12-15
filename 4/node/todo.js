const yargs = require('yargs')
const fs= require('fs')
data = []
try{
    data = JSON.parse(fs.readFileSync('myData.json').toString())
    //console.log(data)
}
catch(e)
{
    fs.writeFileSync('myData.json', "[]")
}

yargs.command({
    command: 'add',
    describe: 'add new task',
    builder:{
        taskTitle:{
            type: 'string',
            demandOption:true,
            describe:'description'
        },
        taskContent:{
            type: 'string'
        }
    },
    handler(argv){

        let id 
        data1 = JSON.parse(fs.readFileSync('myData.json').toString())
        
        if(data1.length > 0){
            let index = (data1.length)
            id = (data1[index-1].id)+1
            console.log(data1[data1.length-1].id)
        }
        else {id=19897}     

        data.push(
        {
                id : id,
                title:argv.taskTitle, 
                content:argv.taskContent,
                status: 'Pending'

        })

        console.log('Done , Task ID => ' + data[data.length - 1].id)
        fs.writeFileSync('myData.json', JSON.stringify(data))
        

            
    }
         
})
yargs.command({
    command:'read',
    handler(){
        data = JSON.parse(fs.readFileSync('myData.json').toString())
        if(data.length > 0)
        {
            console.log(data)
        }
        else
        {
            console.log('No Data')
        }
    }
})

yargs.command({

    command:'Update',
    builder:{
        TaskId:{
            type: 'number',
        }
    },
    handler(argv){
        if(data.length > 0)
        {
            for (let i=0; i < data.length; i++) {
                if (data[i].id === argv.TaskId) {
                    data[i].status = 'Done';
                    
                    fs.writeFileSync('myData.json', JSON.stringify(data))
                }
            }
            console.log('Updated')
        }
        else
        {
            console.log('NO Data')
        }
        
    }
})

yargs.command({

    command:'Delete',
    builder:{
        TaskId:{
            type: 'number',
        }
    },
    handler(argv){
        if(data.length > 0)
        {
            for (let i=0; i < data.length; i++) {
                if (data[i].id === argv.TaskId) {
                    
                    data.splice(i,1)
                    
                    fs.writeFileSync('myData.json', JSON.stringify(data))
                }
            }
            console.log('Deleted')
        }
        else
        {
            console.log('NO Data')
        }
        
    }
})

yargs.parse()

