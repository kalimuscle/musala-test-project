import { h, Fragment } from 'preact';
import {useEffect, useState} from "preact/hooks";
import { useWizard } from 'react-use-wizard';
import {normal, invalid, checkValidation, disabledButton, normalButton, isValidIpv4} from './input-validation-class';
import { v4 as uuidv4 } from 'uuid';
import style from './style.css';
import { formatRelative } from 'date-fns';

// Note: `user` comes from the URL, courtesy of our router
const Step2 = ({ vendor,date, status, devices, onChangeVendor, onChangeStatus, onChangeDate, onChangeDevices, onRemoveDevices, onSaveGateway }) => {
	const MAXIMUM_DEVICES = 10;
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
	const [modal, setModal] = useState(false);

	useEffect(() => {
		let timer = setInterval(() => setTime(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	const enableButton = (vendor, date) => {

		const isEnabledVendor = vendor.length > 7;
		const isEnabledDate= date.length > 8;

		return isEnabledVendor && isEnabledDate;

	}

	const addDevice = () => {
		if(devices.length < MAXIMUM_DEVICES) {
			const uid = uuidv4();

			const device = {
				uid,
				vendor, 
				date, 
				status
			};

			devices.push(device);
			onChangeDevices(devices)
		}
		else {
			setModal(true);
		}
		
	}

	const removeDevice = ( item ) =>{
		const index = devices.indexOf(item);
		devices.splice(index, 1); 
		onRemoveDevices(devices);

	}

	const handleCreateGateway = () => {
		nextStep();
		onSaveGateway();
		
	}

	const list = devices.map((value, index, key) => (
        <tr key={value.uid}>
			<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{value.uid}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.vendor}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.date}</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{value.status ? 'Online' : 'Offline'}</td>
			<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
				<button type="button" onClick={() => removeDevice(value)} class={normalButton} >Remove</button>
			</td>
		</tr>
      )
	);


	const showModal = modal ? (
		<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

			
				<div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div class="sm:flex sm:items-start">
					<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
					
					<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Maximum devices exceeded</h3>
					<div class="mt-2">
						<p class="text-sm text-gray-500">Sorry, but only can add 10 devices to the gateway.</p>
					</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
					<button type="button" onClick={() => setModal(false)} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">OK</button>
				</div>
				</div>
			</div>
		</div>
	) : null;

	return (
		<div class=" flex flex-col">
			{showModal}
			<div class="min-h-full flex flex-col">
				<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form class="space-y-6" action="#" method="POST">
							<div>
								<label for="vendor" class="block text-sm font-medium text-gray-700">Vendor</label>
								<div class="mt-1 relative rounded-md shadow-sm">
									<input type="text" name="vendor" id="vendor" value={vendor} onChange={(evt) => onChangeVendor(evt.target.value)} class={vendor.length < 8 ? invalid : normal} placeholder="Type vendor" />
									{
										vendor.length < 8 ? (
											<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
												<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
													<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
												</svg>
											</div>
										) : null
									}
									
								</div>
								{checkValidation(vendor, "text")}
							</div>

							<div>
								<label for="date" class="block text-sm font-medium text-gray-700">Date</label>
								<div class="mt-1 relative rounded-md shadow-sm">
									<input type="date" name="date" id="date" value={date} onChange={(evt) => onChangeDate(evt.target.value)} class={date.length < 8 ? invalid : normal} placeholder="Type date" />
									{
										date.length < 8 ? (
											<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
												<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
													<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
												</svg>
											</div>
										) : null
									}
									
								</div>
								{checkValidation(date, "text")}
							</div>

							<div class="relative flex items-start">
								<div class="flex items-center h-5">
									<input id="comments" value={status} onChange={()=>onChangeStatus(!status)} aria-describedby="comments-description" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
								</div>
								<div class="ml-3 text-sm">
									<label for="comments" class="font-medium text-gray-700">Status</label>
								</div>
							</div>

							<div>
								<button type="button" onClick={() => addDevice()} class={!enableButton(vendor, date) ? disabledButton : normalButton} >Create device</button>
							</div>
						</form>
					</div>
				</div>
				{devices.length > 0 ? (
					<div class="px-4 sm:px-6 lg:px-8">
						<div class="mt-8 flex flex-col">
							<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<table class="min-w-full divide-y divide-gray-300">
											<thead class="bg-gray-50">
												<tr>
													<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">UID</th>
													<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vendor</th>
													<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date  Created</th>
													<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
													<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
														{devices.length}/10
													</th>
												</tr>
											</thead>
											<tbody class="bg-white">
												{list}
													
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				) :
				(
					<div class="text-center mt-8">
						
						<h3 class="mt-2 text-sm font-medium text-gray-900">Not devices added</h3>
						<p class="mt-1 text-sm text-gray-500">Add devices for you gateways. Maximum 10</p>
					</div>
				)
			}
			</div>
			<div class="flex flex-row justify-center">
				<button type="button" onClick={() => previousStep()} class="w-28 lg:w-64 mt-10 flex mx-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Back</button>
				<button type="button" onClick={() => handleCreateGateway()} class="w-28 lg:w-64 mt-10 flex mx-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Continue</button>
			</div>
		</div>
	);
}

export default Step2;
