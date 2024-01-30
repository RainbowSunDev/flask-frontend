
const Modal = ({ children, headingText, btnText, onClose, onBtnClicked }) => {
    
    return(
        <div className="fixed top-0 h-screen w-full bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <div className="flex justify-center lg:items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto lg:my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#21284B] outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 rounded-t ">
                  <h3 className="text-3xl font=semibold text-white text-center">Here is your color season from GPT4</h3>
                </div>
                <div className="relative p-6 flex-auto text-white">
                    {/* Fixed rate description */}
                    <div className="">
                        <p className="italic ">{headingText}</p>
                    </div>
                </div>
                <div className="flex items-center justify-end p-6 border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={onClose}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
const initialModalData = {
    children: () => (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis rerum
        omnis, minima perferendis, illum quasi expedita quo saepe fuga nulla
        cupiditate. Reprehenderit fugit placeat error corrupti illo ut? Numquam
        repellat molestias autem porro. Autem enim asperiores voluptatem itaque
        libero aspernatur cupiditate porro atque vel. Esse numquam tempora hic
        soluta excepturi?
      </p>
    ),
    headingText: 'Modal',
    btnText: 'Button',
  };
  
export default Modal;
export { initialModalData };