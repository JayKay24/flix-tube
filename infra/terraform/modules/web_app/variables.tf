variable "flixtube_az_subscription_id" {
  type = string
  description = "Azure Subscription ID to manage flixtube resources"
}

variable "flixtube_az_resource_group_name" {
  type = string
  description = "Azure Resource Group Name to manage flixtube resources"
}

variable "flixtube_az_region_name" {
  type = string
  description = "Azure Region where application is deployed"
}

variable "flixtube_aks_app_name" {
  type = string
  description = "App name for AKS cluster"
}

variable "flixtube_kubernetes_version" {
  type = string
  description = "AKS Kubernetes version"
}

variable "flixtube_cosmosdb_account_name" {
  type        = string
  description = "Name for the Azure Cosmos DB account."
}
