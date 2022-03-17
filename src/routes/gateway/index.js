import { h } from 'preact';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import {useEffect, useState} from "preact/hooks";
import { Wizard, useWizard } from 'react-use-wizard';
import { useSelector, useDispatch } from 'react-redux';
import { create_gateway, update_gateway, close_modal_error } from '../../store/actions';
import ErrorModal from '../../components/errorModal';
import style from './style.css';

const HeaderWizard = () =>  {
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

	const setStepComponent = (step, currentStep, label) => {

		let stepComponent = (
			
			<li class="relative md:flex-1 md:flex">
			<a href="#" class="group flex items-center w-full">
				<span class="px-6 py-4 flex items-center text-sm font-medium">
					<span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
						<svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
					</span>
					<span class="ml-4 text-sm font-medium text-gray-900">{label}</span>
				</span>
			</a>				
			<div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
				<svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
					<path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
				</svg>
			</div>
		</li>
		);

		if(step == currentStep){
			stepComponent = (
				<li class="relative md:flex-1 md:flex">
					<a href="#" class="group flex items-center w-full">
						<span class="px-6 py-4 flex items-center text-sm font-medium">
							<span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
								<span class="text-indigo-600">0{step + 1}</span>
							</span>
							<span class="ml-4 text-sm font-medium text-gray-900">{label}</span>
						</span>
					</a>				
					<div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
						<svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
							<path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
						</svg>
					</div>
				</li>
			);
		}
		else if(step > currentStep){
			stepComponent = (
				
				<li class="relative md:flex-1 md:flex">
				<a href="#" class="group flex items-center">
					<span class="px-6 py-4 flex items-center text-sm font-medium">
						<span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
							<span class="text-gray-500 group-hover:text-gray-900">0{step + 1}</span>
						</span>
						<span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{label}</span>
					</span>
				</a>
			</li>
			);
		}

		return stepComponent
	}

	return (
		<nav aria-label="Progress">
			<ol role="list" class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
				{setStepComponent(0, activeStep, "Create Gateway Detail")}
				{setStepComponent(1, activeStep, "Add devices")}
				{setStepComponent(2, activeStep, "Preview")}
			</ol>
		</nav>
	);
}

// Note: `user` comes from the URL, courtesy of our router
const Gateway = ({action} ) => {
	const gateways = useSelector(state => state.gateways);
	const existGateway = gateways.find((value) => value._id == action);
	const error = useSelector(state => state.error)

	const [serial, setSerial] = useState(existGateway != undefined ? existGateway.serial :"");
	const [name, setName] = useState(existGateway != undefined ? existGateway.name :"");
	const [ipv4, setIpv4] = useState(existGateway != undefined ? existGateway.ipv4 :"");

	const [vendor, setVendor] = useState("");
	const [date, setDateCreated] = useState("");
	const [status, setStatus] = useState(false);
	const [devices, setDevices] = useState(existGateway != undefined ? existGateway.devices : []);

	const dispatch = useDispatch();

	const createGateway = () => {
		
		let gateway = {
			serial,
			name,
			ipv4,
			devices
		};
		
		if(existGateway == undefined){
			dispatch(create_gateway(gateway));
		}
		else{
			gateway._id = existGateway._id;
			dispatch(update_gateway(gateway));
		}
		
	}

	const addDevices = ( value) => {
		setVendor("");
		setDateCreated("");
		setStatus(false);
		setDevices(value);
	}

	const newGateway = () => {
		setSerial("");
		setName("");
	    setIpv4("");

		setVendor("");
		setDateCreated("");
		setStatus(false);
		setDevices([]);
	}

	// useEffect(() => {
	// 	let timer = setInterval(() => setTime(Date.now()), 1000);
	// 	return () => clearInterval(timer);
	// }, []);

	const modal = error ? <ErrorModal closeModal={(status)=> dispatch(close_modal_error())}/> : null;

	return (
		<main>
			{modal}
			<div class="relative">
				<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
					<div class="min-h-full flex flex-col py-4 sm:px-6 lg:px-8">	
						<Wizard startIndex={0} header={<HeaderWizard />}>
							<Step1
								serial={serial}
								name={name} 
								ipv4={ipv4} 
								onChangeSerial={(value)=>setSerial(value)}
								onChangeName={(value)=>setName(value)}
								onChangeIpv4={(value)=>{ setIpv4(value)}}
							/>
							<Step2 
								vendor={vendor}
								date={date} 
								status={status}
								devices={devices} 
								onChangeVendor={(value)=>setVendor(value)}
								onChangeDate={(value)=>setDateCreated(value)}
								onChangeStatus={(value)=>setStatus(value)}
								onChangeDevices={(value)=>addDevices(value)}
								onRemoveDevices={(value)=>setDevices(value)}
								onSaveGateway={()=>createGateway()}
							/>
							<Step3 onNewGateway={()=>newGateway()}/>
						</Wizard>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Gateway;
