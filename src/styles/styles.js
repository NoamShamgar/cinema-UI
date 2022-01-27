const lightgray = "#f4f4f4"



 const formStyles = (theme) => {
    return {
        box:{
            position:"absolute",
            top:"30%",
            left:"50%",
            transform:"translateX(-50%)",
            textAlign:"center",
            width: "30%",
            padding:"30px",
            backgroundColor:lightgray,
            borderRadius:"5px",
            boxShadow:"0 0 14px 0px #0000006e"
        },
        input:{
            marginTop:20,
            marginBottom:20,
            display:"block",
        }
    }
}


const layoutStyles = (theme) => {
    return {
        flex: {
            width:"100%",
            display:"flex",
            alignItems:"center",
        },
        themeSec:{
            backgroundColor:theme.palette.secondary.main,
        }
  
    }
}

const gridStyles = (theme) => {
    return {
        gContainer: {
            justifyContent:"center",
            alignItems:"center",
        },
  
    }
}

const gridItemStyles = (theme) => {
    return {
        container: {
            position:"relative"
        }, 
        details: {
            position:"absolute",
            top:0,
            left:0,
            inset:0,
            padding:"30px 10px",
            boxShadow:"inset 0px 0px 15px 6px #000000b0",
            backgroundColor:theme.palette.primary.main +"cc", // "cc" to add opacity
        }
    }
}

export {formStyles,layoutStyles,gridStyles,gridItemStyles}