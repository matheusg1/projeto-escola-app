

export default function TextInput(props){

    return(
        <input type="text" placeholder={props.placeholder}
        value={props.value}        
        className="form-control" />
    );
}