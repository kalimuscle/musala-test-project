import { h } from 'preact';
import { useWizard } from 'react-use-wizard';
import {useEffect, useState} from "preact/hooks";
import {normal, invalid, checkValidation, disabledButton, normalButton, isValidIpv4} from './input-validation-class';
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Step1 = ({ serial, name, ipv4, onChangeSerial, onChangeName, onChangeIpv4 }) => {
	// const [serial, setSerial] = useState("");
	// const [name, setName] = useState("");
	// const [ipv4, setIpv4] = useState("");
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

	// useEffect(() => {
	// 	return () => clearInterval(timer);
	// }, []);

	const enableButton = (serial, name, ipv4) => {

		const isEnabledSerial = serial.length > 7;
		const isEnabledName = name.length > 7;
		const isEnabledIpv4 = true;

		return isEnabledSerial && isEnabledName && isEnabledIpv4;

	}

	return (
		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6" action="#" method="POST">
					<div>
						<label for="serial" class="block text-sm font-medium text-gray-700">Serial number</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<input type="text" name="serial" id="serial" value={serial} onChange={(evt) => onChangeSerial(evt.target.value)} class={serial.length < 8 ? invalid : normal} placeholder="Type serial numer" />
							{
								serial.length < 8 ? (
									<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
									</div>
								) : null
							}
							
						</div>
						{checkValidation(serial, "text")}
					</div>
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<input type="text" name="name" id="name" value={name} onChange={(evt) => onChangeName(evt.target.value)} class={name.length < 8 ? invalid : normal} placeholder="Type name" />
							{
								name.length < 8 ? (
									<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
									</div>
								) : null
							}
							
						</div>
						{checkValidation(name, "text")}
					</div>
					<div>
						<label for="ipv4" class="block text-sm font-medium text-gray-700">Ipv4</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<input type="text" maxLength={15} name="ipv4" onChange={(evt)=>onChangeIpv4(evt.target.value)} id="ipv4" value={ipv4} class={!isValidIpv4(ipv4) ? invalid : normal} placeholder="Type name" />
							{
								!isValidIpv4(ipv4) ? (
									<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
									</div>
								) : null
							}
							
						</div>
						{checkValidation(ipv4, "ip")}
					</div>
					<div>
						<button type="button"  onClick={() => nextStep()} class={!enableButton(serial, name, ipv4) ? disabledButton : normalButton}>Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Step1;
