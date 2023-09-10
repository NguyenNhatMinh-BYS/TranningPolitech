import { campaigngApi } from "@/model/Auth.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  campaign,
  campaignDetail,
  delCampaign,
  postCampaign,
  putCampaign,
} from "@/services/apiCampaign";
import { useDispatch } from "react-redux";
import { activeLoading } from "@/features/loadingSlice/loadingSlice";
import { toast } from "react-toastify";
interface dataCampaingPut {
  dataEditCampaign: campaigngApi;
  token: string;
}
interface dataCampaingPost {
  campaignPost: campaigngApi;
  token: string;
}
//list data
export const useCampaignQuery = (pageParam: campaigngApi) => {
  const dispatch = useDispatch();
  const getCampaignList = async () => {
    dispatch(activeLoading(true));
    const response = await campaign(pageParam);
    let data = response.data.data?.list;

    const totalData = response.data.data?.total;

    for (
      let i = 12 * Number(pageParam.page), x = 0;
      i <= 12 * Number(pageParam.page) + 12 && x < 12;
      i++, x++
    ) {
      if (data[x]) {
        data[x].index = totalData - i;
      } else {
        break;
      }
    }
    const isEmpty = data.length > 0 ? false : true;
    const totlalListData = Array(Math.ceil(totalData / 10)).fill("");

    const maxMinListData = ["0", (Math.ceil(totalData / 10) - 1).toString()];

    return { data, isEmpty, totlalListData, maxMinListData, totalData };
  };
  return useQuery({
    queryKey: ["get-campaign-list", pageParam],
    queryFn: getCampaignList,

    keepPreviousData: true,
    onSettled: () => {
      dispatch(activeLoading(false));
    },
  });
};

//detail
export const useCampaignDetailQuery = (id: string) => {
  window.scrollTo({ top: 0 });
  const dispatch = useDispatch();
  const getCampaignDetail = async () => {
    dispatch(activeLoading(true));
    const response = await campaignDetail({ id: id });
    const data: campaigngApi = response.data.data;

    return { data };
  };
  return useQuery({
    queryKey: ["get-campaign-list", id],
    queryFn: getCampaignDetail,
    keepPreviousData: true,
    onSettled: () => {
      dispatch(activeLoading(false));
    },
  });
};
//delete
export const useCampaignDeletion = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deleteCampaign = async (data: any) => {
    dispatch(activeLoading(true));

    return await delCampaign(data.ids, data.token);
  };
  return useMutation({
    mutationFn: (data: any) => deleteCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-campaign-list"],
      });
      toast.success("deleted successfully");
    },
    onError: () => {
      toast.error("deleted Error!");
    },
    onSettled: () => {
      dispatch(activeLoading(false));
    },
  });
};
export const useCampaignEdit = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const editCampaign = async ({ dataEditCampaign, token }: dataCampaingPut) => {
    dispatch(activeLoading(true));
    return await putCampaign(dataEditCampaign, token);
  };
  return useMutation({
    mutationFn: editCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-campaign-list"],
      });
      toast.success("edit successfully");
    },
    onError: () => {
      toast.error("edit Error!");
    },
    onSettled: () => {
      dispatch(activeLoading(false));
    },
  });
};
export const useCampaignPost = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const createCampaign = async ({ campaignPost, token }: dataCampaingPost) => {
    dispatch(activeLoading(true));
    return await postCampaign(campaignPost, token);
  };
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-campaign-list"],
      });
      toast.success("Create successfully");
    },
    onError: () => {
      toast.error("Create Error!");
    },
    onSettled: () => {
      dispatch(activeLoading(false));
    },
  });
};
