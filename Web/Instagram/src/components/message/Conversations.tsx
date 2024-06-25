/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegEdit } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllConversations } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Conversations() {
  const param = useParams();
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getAllConversations();
      if (data.status === 200) {
        setConversations(data.metadata.conversations);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {/* <!-- Conversations List --> */}
      {!isLoading ? (
        <div className="flex flex-col w-[27%] h-full bg-white border-r border-gray-200 pt-10">
          <div className="flex justify-between ps-6">
            <div className="flex">
              <h2 className="font-bold text-[20px]">
                {user ? user.username : ""}
              </h2>
              <GoChevronDown className="ms-1 my-auto" />
            </div>
            <div className="flex me-8 my-auto">
              <FaRegEdit className="w-[24px] h-[24px]" />
            </div>
          </div>
          <div className="pt-5 flex flex-col flex-grow">
            <div className="flex justify-between ps-6">
              <div className="text-[16px] font-bold mb-4">Messages</div>
              <div className="text-[15px] font-medium mb-4 text-[#65676b] my-auto me-[20px]">
                Requests
              </div>
            </div>
            <div className="overflow-y-scroll flex-grow">
              {conversations?.map((conversation: any) => {
                return (
                  <div
                    className={`flex items-center space-x-4 ${
                      param.id === conversation._id
                        ? "bg-[rgb(239,239,239)]"
                        : ""
                    } hover:bg-[rgb(239,239,239)] ps-6 py-[6px]`}
                    onClick={function (e) {
                      e.preventDefault();
                      navigate("/direct/t/" + conversation._id);
                    }}
                  >
                    <img
                      src={conversation.participants[0].avatar}
                      alt="Profile Picture"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-[14px]">
                        {conversation.participants[0].name}
                      </h4>
                      <p className="mt-[3px] text-gray-500 text-[13px]">
                        Active 4 hours ago
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}