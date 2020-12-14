Height=[]
Weight=[]

    Height.push(parseFloat(prompt("Enter First Height")))
    Height.push(parseFloat(prompt("Enter Second Height")))
    Weight.push(parseFloat(prompt("Enter First Weight")))
    Weight.push(parseFloat(prompt("Enter Second Weight")))

    bmi1 = Height[0]/Weight[0]**2 
    bmi2 = Height[1]/Weight[1]**2 

    console.log(bmi1)
    console.log(bmi2)

    if(bmi1 > bmi2)
        console.log("First")
    else
        console.log("Second")


