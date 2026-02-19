module "staging_qa" {
  source = "../modules/staging_qa"
  flixtube_staging_qa_aks_app_name = var.flixtube_staging_qa_aks_app_name
  flixtube_az_container_registry_name = var.flixtube_az_container_registry_name
  flixtube_az_region_name = var.flixtube_az_region_name
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
  flixtube_az_subscription_id = var.flixtube_az_subscription_id
  flixtube_kubernetes_version = var.flixtube_kubernetes_version
}
