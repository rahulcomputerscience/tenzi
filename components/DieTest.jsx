
export default function DieTest(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return(
        <div >
            <button className="die"
                style={styles}
                onClick={()=> props.hold(props.id)}
            >{props.value}</button>
        </div>
    )
}