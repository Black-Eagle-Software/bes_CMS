export default class WindowNavigation{
    static goToLocation(location){
        //this probably needs some hefty error handling
        //this is also hard-coded for now and may need to be changed
        //...but at least it's only in a single spot!
        window.location.href = `http://10.0.5.15:8080${location}`;
    }
}