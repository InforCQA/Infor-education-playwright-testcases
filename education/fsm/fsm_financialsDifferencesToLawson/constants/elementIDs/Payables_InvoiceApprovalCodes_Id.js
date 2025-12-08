class Payables_InvoiceApprovalCodes_Id {

    static VENDOR_GROUP_INVOICE_ROUTING_CODE = "InvoiceRoutingCodeComposite_VendorGroup";
    static INVOICE_APPROVAL_CODE = "InvoiceRoutingCodeComposite_InvoiceRoutingCode";
    static DESCRIPTION = "InvoiceRoutingCodeComposite_Description";
    static INITIAL_APPROVAL_LEVEL_DRP = "lm-InitialApproverSelectionMethod-dropdown";
    static FINAL_APPROVAL_LEVEL_DRP = "lm-FinalApproverSelectionMethod-dropdown";
    static ASSIGN_APPROVERS_USING_RULES_CHK = "InvoiceRoutingCodeComposite_AssignApproversUsingAuthorityCodes";
    static VENDOR_GROUP_INVOICE_APPROVAL_LEVEL = "InvoiceApprover_VendorGroup";
    static INVOICE_APPROVAL_ROLE = "InvoiceApprover_InvoiceApprovalAuthCode";
    static MAXIMUM_APPROVAL_AMOUNT = "InvoiceApprover_MaxApprovalAmount";
    static SKIP_NEXT_APPROVAL_LEVEL_CHK = "InvoiceApprover_OverrideNextApprovalLevel";
    static ESCALATE_AFTER = "InvoiceApprover_EscalationDays";
}

export default Payables_InvoiceApprovalCodes_Id;