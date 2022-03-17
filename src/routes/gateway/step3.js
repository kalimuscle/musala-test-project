import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import { useWizard } from 'react-use-wizard';
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Step3 = ({ onNewGateway }) => {
	const {
		isLoading,
		isLastStep,
		isFirstStep,
		activeStep,
		stepCount,
		previousStep,
		nextStep,
		goToStep,
		handleStep,
	  } = useWizard();
	const [time, setTime] = useState(Date.now());
	const [count, setCount] = useState(10);

	useEffect(() => {
		let timer = setInterval(() => setTime(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	const newGateway = () => {
		goToStep(0);
		onNewGateway();
	}

	return (
		
		<div class="text-center mt-8">
			<svg class="mx-auto h-12 w-12 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
			</svg>
			
			<h3 class="mt-2 text-sm font-medium text-gray-900">Gateway added</h3>
			<p class="mt-1 text-sm text-gray-500">The gateway was saved succefully</p>
			<div class="mt-6">
				<button type="button" onClick={() => newGateway()} class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
				
					<svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
					</svg>
					Add gateway
				</button>
			</div>
	  	</div>
	);
}

export default Step3;
