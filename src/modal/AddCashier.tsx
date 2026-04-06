import { X, Eye, EyeOff } from "lucide-react";
import "../modal/AddCashier.css";
import { useState } from "react";
import { CreateCashier } from "../services/Axios";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCashier({ isOpen, onClose }: Props) {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [successmessage, setSuccessmessage] = useState<string | null>('')
  const [errormessage, setErrormessage] = useState<string | null>('')

  if (!isOpen) return null
  const HandleCreateCashier = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setLoading(true)

 try{
      const response = await CreateCashier({
        name,
        email,
        password
      })
      console.log(response, "user created successfully");
      setSuccessmessage(" ✅ user created successfully")
      setLoading(false)
      setEmail('')
      setPassword('')
      setName('')
    }catch(error){
      console.log("error creating cashier.:", error)
      setErrormessage("error creating cashier.")
      setLoading(false)
    }
  }
     


  return (
    <div className="modal-overlay ">
      <div className="modal-container mt-15">
        {/* Header */}
        <div className="modal-headers relative">
          <X
            onClick={onClose}
            className="cursor-pointer absolute right-5 top-5 bg-blue-900 text-white rounded-sm p-1"
          />
          <div className="logo-box">
            <img src="/logo.png" alt="loopbox-logo" />
          </div>
        </div>

        {/* Body */}
        <div className="modal-Body">
          <h2>Add Cashier</h2>

          <form onSubmit={HandleCreateCashier}>
            <label>Full-Name</label>
            <div className="input-box">
              <input
              value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="First name & last name "
              />
            </div>
            <label>Email</label>
            <div className="input-box">
              <input
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder=" enter your Email"
              />
            </div>
            <label>password</label>
            <div className="input-box relative">
              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "Password"}
                placeholder=" Create a secure password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3  cursor-pointer mt-2"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <div className="modal-actions">
              <button className="btns cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btns continue" disabled={loading} >

                {loading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin cursor-not-allowed"></span>
                )}
                 {loading ? "Creating Cashier..." : "Create Cashier"}
              </button>
            </div>
            {/* messages */}
             <p className="mt-3 p-3 px-5 bg-green-100 text-green-600 text-xs text-center rounded-lg border-2 border-green-300 hidden">{successmessage}</p>
              <p className="mt-3 p-3 px-5 bg-red-100 text-red-600 text-xs text-center rounded-lg border-2 border-red-300 hidden">{errormessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
