import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/FileUpload";
import RestaurantPicker from "./components/Picker";
function App() {
	return (
		<div className="container mt-4">
			<RestaurantPicker />
		</div>
	);
}

export default App;
